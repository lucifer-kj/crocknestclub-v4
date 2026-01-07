import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { updateOrderStatus, processRefund } from "../actions"

export const dynamic = 'force-dynamic'

export default async function AdminOrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const orderData = await prisma.order.findUnique({
        where: { id },
        include: { items: true, shippingAddress: true, user: true }
    })

    if (!orderData) notFound()

    // Type casting to bypass potential persistent generation sync issues
    const order = orderData as any

    // Server Action Wrappers
    async function markShipped() {
        "use server"
        await updateOrderStatus(id, "SHIPPED")
    }

    async function markDelivered() {
        "use server"
        await updateOrderStatus(id, "DELIVERED")
    }

    async function cancelOrder() {
        "use server"
        await processRefund(id)
    }

    const shippingInfo = order.shippingAddress || (order.shippingInfo as any) || {}

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black uppercase tracking-tight">Order #{order.id.slice(0, 8)}</h1>
                <Badge variant="outline" className="text-lg px-4 py-1">{order.status}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Items</CardTitle></CardHeader>
                        <CardContent>
                            <ul className="divide-y">
                                {order.items.map((item: any) => {
                                    const snapshot = item.productSnapshot as any
                                    return (
                                        <li key={item.id} className="py-4 flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                {snapshot?.image && (
                                                    <div className="w-12 h-12 border bg-muted">
                                                        <img src={snapshot.image} className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-bold">{snapshot?.title}</p>
                                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p>${Number(item.priceAtPurchase).toFixed(2)}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Payment</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${Number(order.total).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2">
                                <span>Total</span>
                                <span>${Number(order.total).toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Customer</CardTitle></CardHeader>
                        <CardContent className="text-sm space-y-2">
                            <p className="font-bold">{order.user?.name || shippingInfo.name || "Guest"}</p>
                            <p>{order.user?.email || shippingInfo.email}</p>
                        </CardContent>
                    </Card>

                    {shippingInfo && (
                        <Card>
                            <CardHeader><CardTitle>Shipping To</CardTitle></CardHeader>
                            <CardContent className="text-sm space-y-1">
                                <p>{shippingInfo.name}</p>
                                <p>{shippingInfo.line1 || shippingInfo.address}</p>
                                <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode || shippingInfo.zip}</p>
                                <p>{shippingInfo.country}</p>
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
                        <CardContent className="space-y-2 flex flex-col">
                            {order.status === "PAID" && (
                                <form action={markShipped}>
                                    <Button className="w-full" type="submit">Mark Shipped</Button>
                                </form>
                            )}
                            {order.status === "SHIPPED" && (
                                <form action={markDelivered}>
                                    <Button className="w-full" variant="outline" type="submit">Mark Delivered</Button>
                                </form>
                            )}
                            {order.status !== "CANCELLED" && (
                                <form action={cancelOrder}>
                                    <Button className="w-full" variant="destructive" type="submit">Cancel & Refund</Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
