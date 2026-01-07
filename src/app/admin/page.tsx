import { prisma } from "@/lib/prisma"
import { OrderStatus } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react"

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

    // 2. Active Orders
    const activeOrders = await prisma.order.count({
        where: { status: { notIn: [OrderStatus.SHIPPED, OrderStatus.DELIVERED, OrderStatus.CANCELLED] } }
    })

    // 3. Inventory Health (Low Stock)
    const lowStockVariants = await prisma.variant.findMany({
        where: { stock: { lte: 5 } },
        include: { product: true },
        take: 5
    })

    const totalProducts = await prisma.product.count()

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

        return { date: dateStr, total: dayTotal, day: d.toLocaleDateString('en-US', { weekday: 'short' }) }
    })
    const maxChartValue = Math.max(...chartData.map(d => d.total), 100) // Default max 100 to avoid div by 0

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-black uppercase tracking-tight">Dashboard Overview</h1>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-2 border-black rounded-none shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider">Revenue (MTD)</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black">${currentRev.toFixed(2)}</div>
                        <p className={`text-xs font-bold ${revGrowth >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {revGrowth > 0 ? '+' : ''}{revGrowth.toFixed(1)}% vs last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-2 border-black rounded-none shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider">Active Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black">{activeOrders}</div>
                        <p className="text-xs text-muted-foreground">Needs processing</p>
                    </CardContent>
                </Card>
                <Card className="border-2 border-black rounded-none shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider">Products</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black">{totalProducts}</div>
                        <p className="text-xs text-muted-foreground">{lowStockVariants.length} Low Stock Variants</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 border-2 border-black rounded-none">
                    <CardHeader>
                        <CardTitle className="uppercase font-black">Weekly Sales</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[200px] flex items-end justify-between gap-2 px-4">
                            {chartData.map((d) => (
                                <div key={d.date} className="flex flex-col items-center gap-2 w-full group">
                                    <div
                                        className="w-full bg-primary/20 border-2 border-transparent group-hover:border-black group-hover:bg-primary transition-all relative"
                                        style={{ height: `${(d.total / maxChartValue) * 100}%`, minHeight: '4px' }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap z-10">
                                            ${d.total}
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-muted-foreground uppercase">{d.day}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 border-2 border-black rounded-none">
                    <CardHeader>
                        <CardTitle className="uppercase font-black">Low Stock Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {lowStockVariants.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Inventory levels are healthy.</p>
                        ) : (
                            <div className="space-y-4">
                                {lowStockVariants.map((v) => (
                                    <div key={v.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                                        <div className="space-y-1">
                                            <p className="font-bold text-sm leading-none">{v.product.title}</p>
                                            <p className="text-xs text-muted-foreground">{v.color} / {v.size}</p>
                                        </div>
                                        <div className="font-mono font-bold text-red-500">
                                            {v.stock} left
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase">Recent Orders</h2>
                <div className="border-2 border-black rounded-none">
                    <div className="grid grid-cols-4 p-4 border-b-2 border-black font-black uppercase bg-muted text-sm">
                        <div>Order ID</div>
                        <div>Customer</div>
                        <div>Status</div>
                        <div>Total</div>
                    </div>
                    <div className="divide-y divide-black/10">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="grid grid-cols-4 p-4 text-sm font-medium hover:bg-muted/50 transition-colors">
                                <div className="font-mono">{order.id.slice(0, 8)}</div>
                                <div>{order.user?.name || "Guest"}</div>
                                <div><span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${order.status === OrderStatus.PAID ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800 border-gray-200'}`}>{order.status}</span></div>
                                <div className="font-mono font-bold">${Number(order.total).toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
