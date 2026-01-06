import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, ShoppingCart, LogOut } from "lucide-react"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session?.user?.email) {
        redirect("/login")
    }

    // Double check role from DB to be sure
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    })

    if (!user || user.role !== "ADMIN") {
        redirect("/")
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-muted/40 border-r min-h-screen flex flex-col">
                <div className="p-6 border-b">
                    <Link href="/admin" className="font-black text-xl uppercase tracking-tighter">
                        Admin Panel
                    </Link>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <LayoutDashboard className="h-4 w-4" />
                            Overview
                        </Button>
                    </Link>
                    <Link href="/admin/products">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <Package className="h-4 w-4" />
                            Products
                        </Button>
                    </Link>
                    <Link href="/admin/orders">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <ShoppingCart className="h-4 w-4" />
                            Orders
                        </Button>
                    </Link>
                </nav>
                <div className="p-4 border-t">
                    <Link href="/">
                        <Button variant="outline" className="w-full gap-2">
                            <LogOut className="h-4 w-4" />
                            Exit Admin
                        </Button>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
