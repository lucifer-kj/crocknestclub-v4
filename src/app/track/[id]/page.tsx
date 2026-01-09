import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Package, Truck, Clock } from "lucide-react"
import { StitchHeader } from "@/components/layout/StitchHeader"
import { StitchFooter } from "@/components/layout/StitchFooter"

export default async function publicTrackPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params
    const orderId = resolvedParams.id

    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true }
    })

    if (!order) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Order Not Found</h1>
                <p className="mb-8">We couldn't find an order with that ID.</p>
                <Button asChild className="rounded-none border-2 border-black">
                    <Link href="/">Return Home</Link>
                </Button>
            </div>
        )
    }

    const steps = [
        { status: "PENDING", label: "Order Placed", icon: Clock },
        { status: "PAID", label: "Processing", icon: CheckCircle },
        { status: "SHIPPED", label: "Shipped", icon: Truck },
        { status: "DELIVERED", label: "Delivered", icon: Package }, // Hypothetical status
    ]

    const currentStepIndex = steps.findIndex(s => s.status === order.status)

    // Calculate totals
    const subtotal = order.items.reduce((acc, item) => acc + (Number(item.priceAtPurchase) * item.quantity), 0)
    const shipping = 12.00 // Hardcoded for now
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax // Note: Real order.total might differ if logic changed, but recalculating for display

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-background-dark">
            <StitchHeader />

            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-text-main dark:text-white">Where's my fit?</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">Tracking Order <span className="font-bold text-primary">#{order.id.slice(0, 8)}</span></p>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-bold bg-primary/10 px-4 py-2 rounded-lg border border-primary/20">
                        <span className="material-symbols-outlined">local_shipping</span>
                        <span>Status: {order.status}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Status Stepper - Ported from previous basic UI but styled better? Or use the Mock's Timeline component if it exists? */}
                        {/* The Mock used <TrackingTimeline />. Let's try to use that if it exists, or rebuild it here. */}
                        {/* Rebuilding Stepper inline for simplicity and to ensure it uses Real Data */}
                        <div className="relative flex justify-between mb-12 px-4">
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-white/10 -z-10 -translate-y-1/2" />
                            <div className="absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 transition-all duration-500" style={{ width: `${Math.max(0, currentStepIndex / (steps.length - 1)) * 100}%` }} />

                            {steps.map((step, index) => {
                                const isCompleted = index <= currentStepIndex
                                const Icon = step.icon
                                return (
                                    <div key={step.status} className="flex flex-col items-center bg-white dark:bg-background-dark px-2">
                                        <div className={`w-10 h-10 border-2 rounded-full flex items-center justify-center mb-2 transition-colors ${isCompleted ? "border-primary bg-primary text-white" : "border-gray-300 bg-white text-gray-300"}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span className={`text-xs font-bold uppercase tracking-widest ${isCompleted ? "text-primary" : "text-gray-400"}`}>{step.label}</span>
                                    </div>
                                )
                            })}
                        </div>


                        {/* Shipping Details Card */}
                        <div className="bg-gradient-to-br from-black to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                                Shipping Details
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8 relative z-10">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">Delivery Address</p>
                                    <p className="font-medium text-lg leading-relaxed text-white">
                                        {(order.shippingInfo as any)?.name || "Guest User"}<br />
                                        {(order.shippingInfo as any)?.address}<br />
                                        {(order.shippingInfo as any)?.city}, {(order.shippingInfo as any)?.zip}
                                    </p>
                                </div>
                                <div className="flex flex-col justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">Tracking Number</p>
                                        <p className="font-mono text-lg text-primary">PENDING-ASSIGNMENT</p>
                                    </div>
                                    <div className="mt-6 md:mt-0">
                                        <button className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                                            Track on FedEx
                                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-white dark:bg-black/20 border border-primary/20 rounded-2xl p-6 md:p-8 shadow-sm">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-text-main dark:text-white">
                                <span className="material-symbols-outlined text-primary">shopping_bag</span>
                                Items in Order ({order.items.length})
                            </h2>
                            <div className="space-y-6">
                                {order.items.map((item) => {
                                    const snapshot = item.productSnapshot as any
                                    return (
                                        <div key={item.id} className="flex gap-4 group">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5">
                                                {snapshot?.image && <img alt={snapshot.title} className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300" src={snapshot.image} />}
                                            </div>
                                            <div className="flex flex-1 flex-col justify-center">
                                                <h3 className="text-base font-bold text-text-main dark:text-white leading-tight">{snapshot?.title}</h3>
                                                <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                                                <p className="mt-2 text-sm font-bold text-primary">${Number(item.priceAtPurchase).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-black/20 border border-primary/20 rounded-2xl p-6 md:p-8 shadow-sm">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-text-main dark:text-white">
                                <span className="material-symbols-outlined text-primary">receipt_long</span>
                                Payment Summary
                            </h2>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Tax (8%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex justify-between items-center">
                                    <span className="text-base font-bold text-text-main dark:text-white">Total Amount</span>
                                    <span className="text-xl font-black text-primary">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 flex items-center justify-between border border-dashed border-gray-300 dark:border-white/10">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-gray-400">headset_mic</span>
                                <span className="text-sm font-medium text-text-main dark:text-white">Need help with this order?</span>
                            </div>
                            <button className="text-sm font-bold text-primary hover:underline">Chat with us</button>
                        </div>
                    </div>
                </div>
            </main>

            <StitchFooter />
        </div>
    )
}
