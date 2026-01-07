import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Package, Truck, Clock } from "lucide-react"

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
    // If status is not in list (e.g. CANCELLED), handle gracefully

    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <div className="border-2 border-black p-8 bg-card shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Tracking Order</h1>
                    <p className="font-mono text-lg">#{order.id}</p>
                </div>

                <div className="space-y-8">
                    {/* Status Stepper */}
                    <div className="relative flex justify-between">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -z-10 -translate-y-1/2" />
                        <div className="absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 transition-all duration-500" style={{ width: `${Math.max(0, currentStepIndex / (steps.length - 1)) * 100}%` }} />

                        {steps.map((step, index) => {
                            const isCompleted = index <= currentStepIndex
                            const Icon = step.icon
                            return (
                                <div key={step.status} className="flex flex-col items-center bg-card px-2">
                                    <div className={`w-10 h-10 border-2 border-black flex items-center justify-center mb-2 transition-colors ${isCompleted ? "bg-primary text-primary-foreground" : "bg-white"}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className={`text-xs font-bold uppercase tracking-widest ${isCompleted ? "text-primary" : "text-muted-foreground"}`}>{step.label}</span>
                                </div>
                            )
                        })}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t-2 border-black">
                        <div>
                            <h2 className="font-bold uppercase mb-4">Summary</h2>
                            <ul className="space-y-4">
                                {order.items.map((item) => {
                                    const snapshot = item.productSnapshot as any
                                    return (
                                        <li key={item.id} className="flex gap-4">
                                            <div className="w-12 h-12 bg-muted border-2 border-black overflow-hidden shrink-0">
                                                {snapshot?.image && <img src={snapshot.image} className="w-full h-full object-cover" />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm uppercase">{snapshot?.title}</p>
                                                <p className="text-xs">x{item.quantity}</p>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div>
                            <h2 className="font-bold uppercase mb-4">Quick Actions</h2>
                            <div className="space-y-2">
                                <Button asChild className="w-full rounded-none border-2 border-black" variant="outline">
                                    <Link href="/contact">Need Help?</Link>
                                </Button>
                                <Button asChild className="w-full rounded-none border-2 border-black text-white">
                                    <Link href="/shop">Continue Shopping</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
