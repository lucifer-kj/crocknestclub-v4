import { prisma } from "@/lib/prisma"
import { OrderStatus } from "@prisma/client"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
    // Dates
    const now = new Date()
    const firstDayCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

    // 1. Revenue Stats
    const currentMonthRevenue = await prisma.order.aggregate({
        _sum: { total: true },
        where: {
            status: OrderStatus.PAID,
            createdAt: { gte: firstDayCurrentMonth }
        }
    })

    const lastMonthRevenue = await prisma.order.aggregate({
        _sum: { total: true },
        where: {
            status: OrderStatus.PAID,
            createdAt: { gte: firstDayLastMonth, lte: lastDayLastMonth }
        }
    })

    const currentRev = Number(currentMonthRevenue._sum.total || 0)
    const lastRev = Number(lastMonthRevenue._sum.total || 0)
    const revGrowth = lastRev === 0 ? 100 : ((currentRev - lastRev) / lastRev) * 100

    // 2. Total Orders
    const totalOrdersCount = await prisma.order.count()
    const activeOrders = await prisma.order.count({
        where: { status: { notIn: [OrderStatus.SHIPPED, OrderStatus.DELIVERED, OrderStatus.CANCELLED] } }
    })

    // 3. Returns
    const returnsCount = await prisma.order.count({
        where: { status: { in: [OrderStatus.CANCELLED] } } // Using Cancelled as proxy for returns/refunds for now based on schema
    })


    // 4. Recent Orders
    const recentOrders = await prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { user: true }
    })

    // 5. Sales Chart Data (Last 7 Days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(now.getDate() - 7)

    const last7DaysOrders = await prisma.order.findMany({
        where: {
            status: OrderStatus.PAID,
            createdAt: { gte: sevenDaysAgo }
        },
        select: { createdAt: true, total: true }
    })

    const chartData = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - (6 - i))
        const dateStr = d.toISOString().split('T')[0]

        const dayTotal = last7DaysOrders
            .filter(o => o.createdAt.toISOString().startsWith(dateStr))
            .reduce((sum, o) => sum + Number(o.total), 0)

        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' })
        return { date: dateStr, total: dayTotal, day: dayName }
    })
    const maxChartValue = Math.max(...chartData.map(d => d.total), 100)

    return (
        <div className="flex flex-col gap-8 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-black dark:text-white text-3xl font-black tracking-[-0.03em] leading-tight">Order Management</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Manage and track customer orders</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center justify-center gap-2 h-10 px-5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-black text-sm font-bold transition-all">
                        <span className="material-symbols-outlined text-[20px]">file_download</span>
                        <span>Export CSV</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-black text-white hover:bg-gray-800 text-sm font-bold shadow-lg shadow-gray-200 dark:shadow-none transition-all">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        <span>Create Order</span>
                    </button>
                </div>
            </div>

            {/* KPI Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Revenue */}
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-900 border border-primary/30 shadow-sm relative overflow-hidden group">
                    <div className="absolute right-0 top-0 h-20 w-20 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <span className="material-symbols-outlined text-primary">payments</span>
                        <span className="text-sm font-semibold uppercase tracking-wider">Revenue (MTD)</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1 relative z-10">
                        <p className="text-black dark:text-white text-3xl font-black tracking-tight">${currentRev.toFixed(2)}</p>
                        <span className={`flex items-center text-sm font-bold px-1.5 py-0.5 rounded ${revGrowth >= 0 ? 'text-green-600 bg-green-50 dark:bg-green-900/30' : 'text-red-600 bg-red-50 dark:bg-red-900/30'}`}>
                            <span className="material-symbols-outlined text-[14px] mr-0.5">{revGrowth >= 0 ? 'trending_up' : 'trending_down'}</span>
                            {revGrowth.toFixed(1)}%
                        </span>
                    </div>
                </div>

                {/* Total Orders */}
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-900 border border-primary/30 shadow-sm relative overflow-hidden group">
                    <div className="absolute right-0 top-0 h-20 w-20 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <span className="material-symbols-outlined text-primary">shopping_cart</span>
                        <span className="text-sm font-semibold uppercase tracking-wider">Total Orders</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1 relative z-10">
                        <p className="text-black dark:text-white text-3xl font-black tracking-tight">{totalOrdersCount}</p>
                    </div>
                </div>

                {/* Active/Pending Orders (Highlighted) */}
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-primary text-white shadow-lg shadow-primary/20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-[#05054a]"></div>
                    <div className="flex items-center gap-2 text-white/80 relative z-10">
                        <span className="material-symbols-outlined text-white">pending_actions</span>
                        <span className="text-sm font-semibold uppercase tracking-wider">Pending Process</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1 relative z-10">
                        <p className="text-white text-3xl font-black tracking-tight">{activeOrders}</p>
                        <span className="text-white/80 text-sm font-medium">Need Attention</span>
                    </div>
                </div>

                {/* Returns */}
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-900 border border-primary/30 shadow-sm relative overflow-hidden group">
                    <div className="absolute right-0 top-0 h-20 w-20 bg-red-50 dark:bg-red-900/20 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <span className="material-symbols-outlined text-red-500">assignment_return</span>
                        <span className="text-sm font-semibold uppercase tracking-wider">Returns (Cancelled)</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1 relative z-10">
                        <p className="text-black dark:text-white text-3xl font-black tracking-tight">{returnsCount}</p>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-black dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">bar_chart</span>
                            Weekly Sales Performance
                        </h3>
                    </div>
                    <div className="h-[200px] flex items-end justify-between gap-2 px-2">
                        {chartData.map((d) => (
                            <div key={d.date} className="flex flex-col items-center gap-2 w-full group">
                                <div
                                    className="w-full bg-primary/10 border border-primary/20 rounded-t-sm group-hover:border-primary group-hover:bg-primary transition-all relative"
                                    style={{ height: `${(d.total / maxChartValue) * 100}%`, minHeight: '4px' }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap z-10">
                                        ${d.total.toFixed(2)}
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-gray-400 uppercase">{d.day}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Recent Orders Table */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-black dark:text-white">Recent Orders</h3>
                    <Link href="/admin/orders" className="text-sm font-bold text-primary hover:text-primary/80 flex items-center gap-1">
                        View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="group hover:bg-primary/5 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary">#{order.id.slice(0, 8)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 mr-3">
                                                {order.user?.name ? order.user.name.charAt(0).toUpperCase() : 'G'}
                                            </div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{order.user?.name || "Guest"}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${order.status === 'PAID' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">${Number(order.total).toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={`/admin/orders/${order.id}`} className="text-gray-400 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined">visibility</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
