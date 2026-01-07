import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Package, Truck, CheckCircle } from "lucide-react"

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session?.user?.email) redirect("/login")

    const resolvedParams = await params
    const orderId = resolvedParams.id

    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true, shippingAddress: true }
    })

    if (!order) notFound()

    // Security check: Ensure order belongs to user
    // In a real app we'd fetch user from DB to get ID ensuring session matches order.userId
    // For now, assuming if userId matches (or if session has ID).
    // Let's rely on session.user.id if available, or fetch user.
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (order.userId !== user?.id) {
        return <div className="p-10 font-bold text-destructive">Unauthorized Access</div>
    }

    const shippingInfo = order.shippingAddress
        ? order.shippingAddress
        : (order.shippingInfo as any) || {}

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 border-b-2 border-black pb-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/account/orders"><ArrowLeft className="w-5 h-5" /></Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-black uppercase tracking-tighter">Order #{order.id.slice(0, 8)}</h1>
                    <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</p>
                </div>
                <div className="ml-auto">
                    <Badge variant={order.status === "SHIPPED" ? "default" : "outline"} className="text-lg px-4 py-1 rounded-none border-2 border-black">
                        {order.status}
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Items */}
                <div className="md:col-span-2 space-y-6">
                    <div className="border-2 border-black p-6 bg-card">
                        <h2 className="text-xl font-bold uppercase mb-4 flex items-center gap-2">
                            <Package className="w-5 h-5" /> Items
                        </h2>
                        <ul className="divide-y divide-black/10">
                            {order.items.map((item) => {
                                const snapshot = item.productSnapshot as any
                                return (
                                    <li key={item.id} className="py-4 flex gap-4">
                                        <div className="w-20 h-20 bg-muted border-2 border-black overflow-hidden shrink-0">
                                            {snapshot?.image && <img src={snapshot.image} alt={snapshot.title} className="w-full h-full object-cover" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold uppercase">{snapshot?.title || "Unknown Product"}</p>
                                            <p className="text-xs font-mono">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-mono font-bold">${Number(item.priceAtPurchase).toFixed(2)}</p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="mt-4 pt-4 border-t-2 border-black flex justify-between items-center text-lg font-black uppercase">
                            <span>Total</span>
                            <span className="font-mono">${Number(order.total).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="border-2 border-black p-6 bg-muted/20">
                        <h2 className="text-lg font-bold uppercase mb-2 flex items-center gap-2">
                            <Truck className="w-4 h-4" /> Shipping
                        </h2>
                        <div className="text-sm space-y-1">
                            <p className="font-bold">{shippingInfo.name || "Guest"}</p>
                            {order.shippingAddress ? (
                                <>
                                    <p>{order.shippingAddress.line1}</p>
                                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                                    <p>{order.shippingAddress.country}</p>
                                </>
                            ) : (
                                <>
                                    <p>{shippingInfo.address}</p>
                                    <p>{shippingInfo.city}, {shippingInfo.zip}</p>
                                    <p>{shippingInfo.country}</p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="border-2 border-black p-6 bg-muted/20">
                        <h2 className="text-lg font-bold uppercase mb-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" /> Payment
                        </h2>
                        <p className="text-sm">Paid via Instamojo</p>
                        <p className="text-xs font-mono text-muted-foreground break-all">{order.paymentId || "N/A"}</p>
                    </div>

                    <Button className="w-full rounded-none border-2 border-black" asChild>
                        <Link href={`/track/${order.id}`}>Track Order Publicly</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
