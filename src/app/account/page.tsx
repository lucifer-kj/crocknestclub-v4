import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function AccountPage() {
    const session = await auth()

    if (!session?.user) {
        redirect("/login")
    }

    const orders = await prisma.order.findMany({
        where: { userId: session.user.id }, // Note: session.user.id might be undefined in type definition, need verification
        include: { items: true },
        orderBy: { createdAt: 'desc' }
    })

    // Type assertion fix if session.user.id is missing in types but present in JWT
    // In auth.ts we need to ensure callbacks populate id.

    return (
        <div className="min-h-screen py-10 px-4 md:px-8 max-w-6xl mx-auto">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar / Profile Card */}
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-medium">{session.user.name}</p>
                            <p className="text-sm text-muted-foreground">{session.user.email}</p>
                            <div className="mt-4">
                                <Badge variant="outline">Member</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Orders Grid */}
                <div className="md:col-span-3 space-y-6">
                    <h2 className="text-2xl font-bold uppercase">Order History</h2>
                    {orders.length === 0 ? (
                        <p className="text-muted-foreground">No orders found.</p>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <Card key={order.id}>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-base">Order #{order.id.slice(0, 8)}</CardTitle>
                                        <Badge>{order.status}</Badge>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span>Date</span>
                                            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm font-bold">
                                            <span>Total</span>
                                            <span>${Number(order.total).toFixed(2)}</span>
                                        </div>
                                        <div className="mt-4 pt-4 border-t">
                                            <p className="text-sm text-muted-foreground mb-2">{order.items.length} items</p>
                                            <div className="flex gap-2 overflow-x-auto">
                                                {order.items.map((item) => (
                                                    <div key={item.id} className="h-12 w-12 bg-muted rounded flex-shrink-0" />
                                                    // Placeholder for item images if we fetched them or stored in snapshot
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
