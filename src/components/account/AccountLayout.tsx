"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { User, Package, Heart, MapPin, LogOut } from "lucide-react"

interface AccountLayoutProps {
    children: React.ReactNode
}

export function AccountLayout({ children }: AccountLayoutProps) {
    const pathname = usePathname()

    const navItems = [
        { href: "/account", label: "Overview", icon: User },
        { href: "/account/orders", label: "Orders", icon: Package },
        { href: "/account/wishlist", label: "Wishlist", icon: Heart },
        { href: "/account/addresses", label: "Addresses", icon: MapPin },
    ]

    return (
        <div className="container py-10 px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="sticky top-24">
                        <div className="mb-6 p-4 border-2 border-black bg-muted/20">
                            <h2 className="font-black uppercase text-xl">My Account</h2>
                            <p className="text-xs text-muted-foreground mt-1">Manage your stash</p>
                        </div>

                        <nav className="space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.href

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 font-bold uppercase text-sm border-2 border-transparent transition-all hover:border-black hover:bg-accent",
                                            isActive && "border-black bg-primary text-primary-foreground"
                                        )}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {item.label}
                                    </Link>
                                )
                            })}

                            <button className="w-full flex items-center gap-3 px-4 py-3 font-bold uppercase text-sm border-2 border-transparent text-destructive hover:border-destructive hover:bg-destructive/10 transition-all text-left">
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    <div className="border-2 border-black bg-card p-6 md:p-8 min-h-[500px]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
