import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function AdminCustomersPage() {
    // Fetch customers (users with orders)
    // For now just fetching all users
    const customers = await prisma.user.findMany({
        take: 20,
        orderBy: { createdAt: 'desc' },
        include: {
            orders: {
                select: { id: true, total: true, createdAt: true }
            }
        }
    })

    const totalCustomers = await prisma.user.count()

    return (
        <div className="flex flex-col gap-8 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-black dark:text-white text-3xl font-black tracking-[-0.03em] leading-tight">Customer Management</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">View and manage customer accounts</p>
                </div>
                <button className="flex items-center justify-center gap-2 h-10 px-5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-black text-sm font-bold transition-all">
                    <span className="material-symbols-outlined text-[20px]">file_download</span>
                    <span>Export CSV</span>
                </button>
            </div>

            {/* KPI Cards (Static for now/Placeholder logic) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-900 border border-primary/30 shadow-sm relative overflow-hidden group">
                    <div className="absolute right-0 top-0 h-20 w-20 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <span className="material-symbols-outlined text-primary">group</span>
                        <span className="text-sm font-semibold uppercase tracking-wider">Total Customers</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1 relative z-10">
                        <p className="text-black dark:text-white text-3xl font-black tracking-tight">{totalCustomers}</p>
                    </div>
                </div>
                {/* Add more KPI cards as needed */}
            </div>


            {/* Customers Table */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-gray-400">search</span>
                        </div>
                        <input className="block w-full pl-10 pr-3 py-2.5 border border-primary/30 rounded-lg leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-shadow" placeholder="Search by Name or Email" type="text" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Orders</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Spent</th>
                                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                            {customers.map((customer) => {
                                const totalSpent = customer.orders.reduce((acc, order) => acc + Number(order.total), 0)
                                return (
                                    <tr key={customer.id} className="group hover:bg-primary/5 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary mr-3">
                                                    {(customer.name || 'G').charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="text-sm font-bold text-gray-900 dark:text-white">{customer.name || "Guest"}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                                                {customer.orders.length}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">${totalSpent.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-primary hover:text-primary/80 font-bold mr-3">Edit</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
