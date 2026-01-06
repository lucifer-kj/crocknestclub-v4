import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Package, ShoppingCart } from "lucide-react"

export default async function AdminDashboardPage() {
    // Fetch stats
    const totalRevenue = await prisma.order.aggregate({
        _sum: { total: true },
        where: { status: { not: "PENDING" } } // Assuming PENDING is unpaid/incomplete
    })

    const activeOrders = await prisma.order.count({
        where: { status: { notIn: ["SHIPPED", "CANCELLED"] } } // Everything else is active
    })

    const totalProducts = await prisma.product.count()

    // Recent orders
    const recentOrders = await prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { user: true }
    })

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-black uppercase tracking-tight">Dashboard Overview</h1>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${Number(totalRevenue._sum.total || 0).toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeOrders}</div>
                        <p className="text-xs text-muted-foreground">+12 since last hour</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalProducts}</div>
                        <p className="text-xs text-muted-foreground">4 Low stock</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Recent Orders</h2>
                <div className="border rounded-md">
                    <div className="grid grid-cols-4 p-4 border-b font-medium bg-muted/50 text-sm">
                        <div>Order ID</div>
                        <div>Customer</div>
                        <div>Status</div>
                        <div>Total</div>
                    </div>
                    <div className="divide-y">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="grid grid-cols-4 p-4 text-sm">
                                <div className="font-mono">{order.id.slice(0, 8)}</div>
                                <div>{order.user?.name || "Guest"}</div>
                                <div><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground">{order.status}</span></div>
                                <div>${Number(order.total).toFixed(2)}</div>
                            </div>
                        ))}
                        {recentOrders.length === 0 && (
                            <div className="p-4 text-center text-muted-foreground">No orders yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
