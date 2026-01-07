import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"

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
        <div className="flex min-h-screen w-full bg-[#f8f8fc] dark:bg-[#101022] font-sans">
            {/* Sidebar - Stitch UI Style */}
            <aside className="hidden md:flex flex-col w-72 flex-shrink-0 bg-gradient-to-b from-[#101022] to-[#05054a] border-r border-primary/20 transition-all duration-300">
                {/* Brand */}
                <div className="h-20 flex items-center px-8 border-b border-white/10">
                    <div className="flex flex-col">
                        <h1 className="text-white text-xl font-black tracking-tighter leading-none">CROCKNESTCLUB</h1>
                        <p className="text-primary text-xs font-medium tracking-widest uppercase mt-1">Admin Panel</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                    <Link href="/admin" className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors group">
                        <span className="material-symbols-outlined group-hover:text-primary transition-colors">dashboard</span>
                        <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                    <Link href="/admin/orders" className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors group">
                        <span className="material-symbols-outlined group-hover:text-primary transition-colors">shopping_bag</span>
                        <span className="text-sm font-medium">Orders</span>
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors group">
                        <span className="material-symbols-outlined group-hover:text-primary transition-colors">inventory_2</span>
                        <span className="text-sm font-medium">Products</span>
                    </Link>
                    <Link href="/admin/customers" className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors group">
                        <span className="material-symbols-outlined group-hover:text-primary transition-colors">group</span>
                        <span className="text-sm font-medium">Customers</span>
                    </Link>

                    <div className="my-2 border-t border-white/10"></div>
                    <Link href="/" className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors group">
                        <span className="material-symbols-outlined group-hover:text-red-500 transition-colors">logout</span>
                        <span className="text-sm font-medium">Exit Admin</span>
                    </Link>
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-white font-bold border border-white/20">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <p className="text-white text-sm font-medium truncate">{user.name || 'Admin'}</p>
                            <p className="text-gray-400 text-xs truncate">{user.email}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Mobile Header (visible only on small screens) */}
                <header className="h-16 flex md:hidden items-center justify-between px-4 bg-[#101022] text-white shrink-0">
                    <span className="font-black">CROCKNESTCLUB</span>
                    <button className="text-white"><span className="material-symbols-outlined">menu</span></button>
                </header>

                <div className="flex-1 overflow-y-auto p-6 md:p-10">
                    {children}
                </div>
            </main>
        </div>
    )
}
