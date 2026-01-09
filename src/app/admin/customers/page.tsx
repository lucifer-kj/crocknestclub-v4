import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function AdminCustomersPage() {
    const customers = await prisma.user.findMany({
        where: { role: "USER" },
        include: {
            orders: {
                where: { status: "PAID" }
            }
        },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="flex flex-col gap-8 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-black dark:text-white text-3xl font-black tracking-[-0.03em] leading-tight">Customers</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">View and manage your customer base</p>
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col cursor-default">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Join Date</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Orders</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total Spent</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                            {customers.map((customer) => {
                                const totalSpent = customer.orders.reduce((sum, order) => sum + Number(order.total), 0)
                                return (
                                    <tr key={customer.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary mr-3">
                                                    {customer.name ? customer.name.charAt(0).toUpperCase() : 'C'}
                                                </div>
                                                <div className="text-sm font-bold text-gray-900 dark:text-white">{customer.name || "Unknown"}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(customer.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">{customer.orders.length}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary">${totalSpent.toFixed(2)}</td>
                                    </tr>
                                )
                            })}
                            {customers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No customers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
