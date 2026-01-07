import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, Package, Printer } from "lucide-react"
import { notFound } from "next/navigation"
import { OrderItem } from "@prisma/client"

export default async function CheckoutSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { orderId } = await searchParams

    if (!orderId || typeof orderId !== "string") {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-4xl font-black uppercase tracking-tight mb-4">Invalid Order</h1>
                <Button asChild><Link href="/">Return Home</Link></Button>
            </div>
        )
    }

    const orderData = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true, shippingAddress: true } as any
    })

    if (!orderData) notFound()

    const order = orderData as any

    // Fallback for shipping info if relation is missing (Guest checkout snapshot)
    const shippingSnap = (order.shippingInfo as any) || {}

    return (
        <div className="max-w-3xl mx-auto py-16 px-4">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Order Confirmed!</h1>
                <p className="text-xl text-muted-foreground">Thank you for your purchase.</p>
                <p className="font-mono mt-2">Order #{order.id}</p>
            </div>

            <div className="border-2 border-black bg-card shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
                <div className="flex justify-between items-start mb-8 border-b-2 border-black pb-8">
                    <div>
                        <h2 className="font-bold uppercase text-lg mb-2">Shipping To</h2>
                        <div className="text-sm space-y-1">
                            <p className="font-bold">{order.shippingAddress?.name || shippingSnap.name || "Guest"}</p>
                            <p>{order.shippingAddress?.line1 || shippingSnap.address}</p>
                            <p>
                                {order.shippingAddress?.city || shippingSnap.city}, {order.shippingAddress?.state || ""} {order.shippingAddress?.postalCode || shippingSnap.zip}
                            </p>
                            <p>{order.shippingAddress?.country || shippingSnap.country}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h2 className="font-bold uppercase text-lg mb-2">Payment</h2>
                        <p className="text-sm">Method: Instamojo</p>
                        <p className="text-sm text-green-600 font-bold uppercase">{order.status}</p>
                    </div>
                </div>

                <div className="space-y-6 mb-8">
                    <h2 className="font-bold uppercase text-lg flex items-center gap-2">
                        <Package className="w-5 h-5" /> Items
                    </h2>
                    <ul className="divide-y divide-black/10">
                        {order.items.map((item: OrderItem) => {
                            const snapshot = item.productSnapshot as any
                            return (
                                <li key={item.id} className="py-4 flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-muted border-2 border-black overflow-hidden">
                                            {snapshot?.image && <img src={snapshot.image} alt="" className="w-full h-full object-cover" />}
                                        </div>
                                        <div>
                                            <p className="font-bold uppercase text-sm">{snapshot?.title}</p>
                                            <p className="text-xs font-mono">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-mono font-bold">${Number(item.priceAtPurchase).toFixed(2)}</p>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="border-t-2 border-black pt-4 flex justify-between items-center text-xl font-black uppercase">
                        <span>Total</span>
                        <span className="font-mono">${Number(order.total).toFixed(2)}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button asChild className="w-full rounded-none border-2 border-black" size="lg">
                        <Link href="/shop">Continue Shopping</Link>
                    </Button>
                    <Button variant="outline" className="w-full rounded-none border-2 border-black" size="lg" asChild>
                        <Link href={`/track/${order.id}`}>Track Order</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
