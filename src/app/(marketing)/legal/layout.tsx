"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function LegalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const links = [
        { href: "/legal/privacy-policy", label: "Privacy Policy" },
        { href: "/legal/terms-of-service", label: "Terms of Service" },
        { href: "/legal/return-policy", label: "Return Policy" },
        { href: "/legal/shipping-policy", label: "Shipping Policy" },
    ]

    return (
        <div className="container py-12 px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-12">
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="sticky top-24">
                        <h2 className="font-black uppercase text-xl mb-6">Legal</h2>
                        <nav className="flex flex-col space-y-2">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-bold uppercase transition-colors hover:text-primary",
                                        pathname === link.href ? "text-primary border-l-4 border-primary pl-4" : "text-muted-foreground pl-5 border-l-4 border-transparent"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </aside>
                <main className="flex-1 max-w-3xl">
                    {children}
                </main>
            </div>
        </div>
    )
}
