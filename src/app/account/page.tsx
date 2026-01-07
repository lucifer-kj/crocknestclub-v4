import Link from 'next/link';

export default function AccountDashboardPage() {
    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 via-white to-gray-50 dark:from-primary/20 dark:via-surface-dark dark:to-surface-dark border border-blue-100 dark:border-white/10 p-8 shadow-sm">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <span className="material-symbols-outlined text-[180px] text-primary rotate-12">local_mall</span>
                </div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-extrabold text-black dark:text-white mb-2">Welcome back, Alex! ⚡️</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg">You're rocking the Gold Tier. You've earned <span className="text-primary font-bold">1,250 points</span> which can be redeemed for a $50 coupon.</p>
                    <div className="flex flex-wrap gap-3">
                        <button className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                            View Rewards
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>
                        <button className="bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 text-black dark:text-white border border-gray-200 dark:border-white/10 px-5 py-2.5 rounded-lg font-bold text-sm transition-all">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-surface-dark p-5 rounded-xl border border-gray-200 dark:border-white/10 flex flex-col justify-between group hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 dark:bg-primary/20 rounded-lg text-primary">
                            <span className="material-symbols-outlined">shopping_cart</span>
                        </div>
                        <span className="text-xs font-bold text-green-500 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded">+2 this month</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Orders</p>
                        <h3 className="text-2xl font-bold text-black dark:text-white">24</h3>
                    </div>
                </div>
                <div className="bg-white dark:bg-surface-dark p-5 rounded-xl border border-gray-200 dark:border-white/10 flex flex-col justify-between group hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-purple-50 dark:bg-purple-500/20 rounded-lg text-purple-600 dark:text-purple-400">
                            <span className="material-symbols-outlined">local_shipping</span>
                        </div>
                        <span className="text-xs font-bold text-gray-500 bg-gray-100 dark:bg-white/10 px-2 py-1 rounded">In Transit</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Active Shipment</p>
                        <h3 className="text-2xl font-bold text-black dark:text-white">#ORD-9281</h3>
                    </div>
                </div>
                <div className="bg-white dark:bg-surface-dark p-5 rounded-xl border border-gray-200 dark:border-white/10 flex flex-col justify-between group hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-amber-50 dark:bg-amber-500/20 rounded-lg text-amber-600 dark:text-amber-400">
                            <span className="material-symbols-outlined">loyalty</span>
                        </div>
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">Gold</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Loyalty Points</p>
                        <h3 className="text-2xl font-bold text-black dark:text-white">1,250</h3>
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-black dark:text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">history</span>
                        Recent Orders
                    </h2>
                    <Link href="/account/orders" className="text-sm font-bold text-primary hover:text-primary-dark flex items-center gap-1">
                        View All History
                        <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 dark:bg-white/5">
                            <tr>
                                <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Order ID</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Date</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Total</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-white/10 text-sm">
                            <tr className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono font-medium text-black dark:text-white">#CN-29381</td>
                                <td className="p-4 text-gray-600 dark:text-gray-400">Oct 24, 2023</td>
                                <td className="p-4">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-500/20 text-primary border border-blue-200 dark:border-blue-500/30">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                        Shipped
                                    </span>
                                </td>
                                <td className="p-4 font-bold text-black dark:text-white">$124.00</td>
                                <td className="p-4 text-right">
                                    <button className="text-gray-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">visibility</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono font-medium text-black dark:text-white">#CN-29304</td>
                                <td className="p-4 text-gray-600 dark:text-gray-400">Sep 12, 2023</td>
                                <td className="p-4">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 dark:bg-green-500/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/30">
                                        Delivered
                                    </span>
                                </td>
                                <td className="p-4 font-bold text-black dark:text-white">$89.50</td>
                                <td className="p-4 text-right">
                                    <button className="text-gray-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">visibility</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Saved Items */}
                <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/10 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-black dark:text-white">Saved Items</h2>
                        <Link href="/account/wishlist" className="text-primary text-sm font-bold hover:underline">View All</Link>
                    </div>
                    <div className="space-y-4">
                        <div className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-white/10 group cursor-pointer">
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH4SgtNzViB_zFqBCuLUh0mEKL6jTM9M8yg6m4cayb9OVGEaDuYPMuwdyruViBCCc6FGn0rSgUmru1dTL1vWLVd1xXhOjEJLZGqv7D0gZHUD0RgIyc_Xvqzav8vFOGL3nJYqoNQcxmaaHeuIOC9Kcxc2Y-ltUm9LIjWD8Pu3N5OJkfhro83JSHC3i_gU9cGYVrbD3G36QNxGeDM_qpBTMewA0dXIW8hDuHJnJ2h0iRDoMCcn-wI7f6zXuUrhPtiAB-AnzTkdgAqz4" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <h4 className="font-bold text-black dark:text-white group-hover:text-primary transition-colors">Cyber-Punk Oversized Tee</h4>
                                <p className="text-sm text-gray-500 mb-2">Size: L • Black</p>
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-black dark:text-white">$45.00</span>
                                    <button className="text-xs bg-black dark:bg-white text-white dark:text-black px-3 py-1.5 rounded font-bold hover:opacity-80 transition-opacity">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Default Address */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/10 p-6 h-full">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-black dark:text-white">Default Address</h2>
                            <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-gray-100 dark:bg-white/5 rounded-lg text-gray-600 dark:text-gray-400">
                                    <span className="material-symbols-outlined">home</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-black dark:text-white">Home</h4>
                                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                                        Alex Doe<br />
                                        1248 Electric Ave, Apt 402<br />
                                        San Francisco, CA 94103<br />
                                        United States
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secure Account Banner */}
            <div className="rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 overflow-hidden relative">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
                <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-white dark:bg-white/5 text-primary border border-primary/20 shadow-sm">
                            <span className="material-symbols-outlined">security</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-black dark:text-white text-lg">Secure Your Account</h3>
                            <p className="text-gray-500 text-sm">Enable Two-Factor Authentication for extra safety.</p>
                        </div>
                    </div>
                    <button className="whitespace-nowrap px-6 py-2.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white font-bold text-sm transition-all duration-300 bg-white dark:bg-transparent">
                        Enable 2FA
                    </button>
                </div>
            </div>
        </div>
    );
}
