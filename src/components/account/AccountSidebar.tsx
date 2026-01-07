"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AccountSidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/10 p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-6 p-2">
                    <div className="size-12 rounded-full overflow-hidden ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-black">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmF8O5icZ1gei4ZOlMHgqxJgkL-pyghsKNOCi48csvi_KBBZWshMF1J6jsqJa0xAyz_5wF4GDCpLFmg7scfLs01xqF9ONDLZwUj2GCgLAkGoMCIuvPsbBhK5mrVlTKbKzS-SGZMnCG6rYfJSjC7BjLOp2GcnoJbFLAzGugWQgfHMq0Qnl_Sa4dEQczRfmF5Z4zoDgl4mSwjMAZCbqU8GVygAP17CcdNHQgLzSVmMB0R8ICBG076fged-qBrRtRmLHKiU64hq365oU" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm leading-tight text-black dark:text-white">Alex Doe</h3>
                        <p className="text-xs font-medium text-primary">Gold Tier Member</p>
                    </div>
                </div>
                <nav className="space-y-1">
                    <Link href="/account" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors ${isActive('/account') ? 'bg-primary/10 text-primary border-l-4 border-primary' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'}`}>
                        <span className="material-symbols-outlined filled">dashboard</span>
                        Dashboard
                    </Link>
                    <Link href="/account/orders" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all group ${isActive('/account/orders') ? 'bg-primary/10 text-primary border-l-4 border-primary' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'}`}>
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform">package_2</span>
                        My Orders
                    </Link>
                    <Link href="/account/wishlist" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all group ${isActive('/account/wishlist') ? 'bg-primary/10 text-primary border-l-4 border-primary' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'}`}>
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform">favorite</span>
                        Wishlist
                        <span className="ml-auto bg-gray-100 dark:bg-white/10 text-xs px-2 py-0.5 rounded-full">12</span>
                    </Link>
                    <Link href="/account/addresses" className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-black dark:hover:text-white rounded-lg font-medium transition-all group">
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform">location_on</span>
                        Addresses
                    </Link>
                    <Link href="/account/payment" className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-black dark:hover:text-white rounded-lg font-medium transition-all group">
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform">credit_card</span>
                        Payment Methods
                    </Link>
                    <div className="h-px bg-gray-200 dark:bg-white/10 my-2"></div>
                    <Link href="/login" className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-red-50 hover:text-red-600 rounded-lg font-medium transition-colors">
                        <span className="material-symbols-outlined">logout</span>
                        Logout
                    </Link>
                </nav>
            </div>
        </aside>
    );
}
