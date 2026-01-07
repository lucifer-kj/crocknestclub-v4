import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { updateOrderStatus, processRefund } from "../actions"
import Link from "next/link"

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
        <div className="flex flex-col gap-8 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/admin/orders" className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white">Order #{order.id.slice(0, 8)}</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                            {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold border ${order.status === 'PAID' ? 'bg-green-100 text-green-800 border-green-200' : order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                        {order.status}
                    </span>
                    <button className="flex items-center justify-center gap-2 h-10 px-5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-black text-sm font-bold transition-all">
                        <span className="material-symbols-outlined text-[20px]">print</span>
                        <span>Print Invoice</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Items & Payment */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Items */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Order Items</h3>
                        </div>
                        <div className="p-6">
                            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                                {order.items.map((item: any) => {
                                    const snapshot = item.productSnapshot as any
                                    return (
                                        <li key={item.id} className="py-4 flex justify-between items-center first:pt-0 last:pb-0">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden">
                                                    {snapshot?.image ? (
                                                        <img src={snapshot.image} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                            <span className="material-symbols-outlined">image</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white">{snapshot?.title || "Unknown Product"}</p>
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity} × ${Number(item.priceAtPurchase).toFixed(2)}</p>
                                                </div>
                                            </div>
                                            <p className="font-bold text-gray-900 dark:text-white">${(Number(item.priceAtPurchase) * item.quantity).toFixed(2)}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Payment Summary</h3>
                        </div>
                        <div className="p-6 space-y-3">
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Subtotal</span>
                                <span>${Number(order.total).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Shipping</span>
                                <span>$0.00</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Tax</span>
                                <span>$0.00</span>
                            </div>
                            <div className="flex justify-between font-black text-xl text-gray-900 dark:text-white border-t border-gray-100 dark:border-gray-800 pt-4 mt-2">
                                <span>Total</span>
                                <span>${Number(order.total).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Customer & Actions */}
                <div className="flex flex-col gap-6">
                    {/* Customer */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Customer</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {(order.user?.name || shippingInfo.name || "Guest").charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">{order.user?.name || shippingInfo.name || "Guest"}</p>
                                    <p className="text-sm text-gray-500">{order.user?.email || shippingInfo.email}</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Shipping Address</h4>
                                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                    <p>{shippingInfo.name}</p>
                                    <p>{shippingInfo.line1 || shippingInfo.address}</p>
                                    <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode || shippingInfo.zip}</p>
                                    <p>{shippingInfo.country}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-primary/20 shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-primary/5">
                            <h3 className="text-lg font-bold text-primary">Actions</h3>
                        </div>
                        <div className="p-6 flex flex-col gap-3">
                            {order.status === "PAID" && (
                                <form action={markShipped} className="w-full">
                                    <button type="submit" className="w-full py-3 px-4 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">local_shipping</span>
                                        Mark as Shipped
                                    </button>
                                </form>
                            )}
                            {order.status === "SHIPPED" && (
                                <form action={markDelivered} className="w-full">
                                    <button type="submit" className="w-full py-3 px-4 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">check_circle</span>
                                        Mark as Delivered
                                    </button>
                                </form>
                            )}
                            {order.status !== "CANCELLED" && (
                                <form action={cancelOrder} className="w-full">
                                    <button type="submit" className="w-full py-3 px-4 rounded-lg border border-red-200 bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-all flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">cancel</span>
                                        Cancel & Refund
                                    </button>
                                </form>
                            )}
                            {order.status === "CANCELLED" && (
                                <p className="text-center text-sm font-medium text-red-500 bg-red-50 py-2 rounded">Order Cancelled</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
