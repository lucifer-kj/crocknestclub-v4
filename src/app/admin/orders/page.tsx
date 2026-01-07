import { prisma } from "@/lib/prisma"
import { OrderStatus } from "@prisma/client"
import Link from "next/link"

export default async function AdminOrdersPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
    const { status } = await searchParams
    const where = status && status !== "ALL" ? { status: status as OrderStatus } : {}

    const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        include: { user: true, items: true },
        where
    })

    const statuses = ["ALL", "PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"]

    return (
        <div className="flex flex-col gap-8 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                {/* Search */}
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400">search</span>
                    </div>
                    <input className="block w-full pl-10 pr-3 py-2.5 border border-primary/30 rounded-lg leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-shadow" placeholder="Search by Order #, Customer, or Item" type="text" />
                </div>
                {/* Filter Chips */}
                <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    {statuses.map((s) => (
                        <Link
                            key={s}
                            href={s === "ALL" ? "/admin/orders" : `/admin/orders?status=${s}`}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-colors whitespace-nowrap ${status === s || (!status && s === "ALL")
                                    ? "border-primary/30 bg-primary/5 text-primary"
                                    : "border-gray-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                                }`}
                        >
                            {s}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Items</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                            {orders.map((order) => {
                                const shippingInfo: any = order.shippingInfo; // Type assertion for now
                                return (
                                    <tr key={order.id} className="group hover:bg-primary/5 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary">
                                            <Link href={`/admin/orders/${order.id}`}>#{order.id.slice(0, 8)}</Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 mr-3">
                                                    {(order.user?.name || shippingInfo?.name || "Guest").charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{order.user?.name || shippingInfo?.name || "Guest"}</div>
                                                    <div className="text-xs text-gray-500">{order.user?.email || shippingInfo?.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${order.status === 'PAID' ? 'bg-green-100 text-green-800 border-green-200' : order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items.length} items</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">${Number(order.total).toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link href={`/admin/orders/${order.id}`} className="text-primary hover:text-primary/80 font-bold mr-3">View</Link>
                                            <button className="text-gray-400 hover:text-gray-600"><span className="material-symbols-outlined text-[20px] align-middle">more_vert</span></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Placeholder */}
                <div className="bg-white dark:bg-gray-900 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 sm:px-6">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Showing <span className="font-bold">1</span> to <span className="font-bold">{orders.length}</span> results
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
