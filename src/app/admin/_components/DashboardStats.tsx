"use client"

import useSWR from "swr"

interface DashboardStatsProps {
    initialData: {
        totalRevenue: number
        revGrowth: number
        activeOrders: number
        lowStockItems: number
        totalProducts: number
        returnsCount: number
        totalOrders: number
    }
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function DashboardStats({ initialData }: DashboardStatsProps) {
    const { data } = useSWR('/api/admin/stats', fetcher, {
        initialData: initialData as any, // initialData deprecated in SWR 2+, use fallbackData or similar if available, or just rely on hydration. Actually 'fallbackData' is the modern way.
        fallbackData: initialData,
        refreshInterval: 5000 // Poll every 5 seconds
    })

    const stats = data || initialData

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Revenue */}
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-900 border border-primary/30 shadow-sm relative overflow-hidden group">
                <div className="absolute right-0 top-0 h-20 w-20 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <span className="material-symbols-outlined text-primary">payments</span>
                    <span className="text-sm font-semibold uppercase tracking-wider">Revenue (MTD)</span>
                </div>
                <div className="flex items-baseline gap-2 mt-1 relative z-10">
                    <p className="text-black dark:text-white text-3xl font-black tracking-tight">${stats.totalRevenue.toFixed(2)}</p>
                    <span className={`flex items-center text-sm font-bold px-1.5 py-0.5 rounded ${stats.revGrowth >= 0 ? 'text-green-600 bg-green-50 dark:bg-green-900/30' : 'text-red-600 bg-red-50 dark:bg-red-900/30'}`}>
                        <span className="material-symbols-outlined text-[14px] mr-0.5">{stats.revGrowth >= 0 ? 'trending_up' : 'trending_down'}</span>
                        {stats.revGrowth.toFixed(1)}%
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
                    <p className="text-black dark:text-white text-3xl font-black tracking-tight">{stats.totalOrders}</p>
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
                    <p className="text-white text-3xl font-black tracking-tight">{stats.activeOrders}</p>
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
                    <p className="text-black dark:text-white text-3xl font-black tracking-tight">{stats.returnsCount}</p>
                </div>
            </div>
        </div>
    )
}
