import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function OrdersPage() {
    const session = await auth()

    if (!session?.user) {
        redirect("/login?callbackUrl=/account/orders")
    }

    const orders = await prisma.order.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
        include: { items: true }
    })

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-black tracking-tight text-black dark:text-white">My Orders</h1>

            {orders.length === 0 ? (
                <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
                    <div className="p-8 text-center text-gray-500">
                        <p>No orders found.</p>
                        <Link href="/shop" className="text-primary hover:underline mt-2 inline-block">Start Shopping</Link>
                    </div>
                </div>
            ) : (
                <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                                <tr>
                                    <th className="p-4 font-bold text-black dark:text-white">Order ID</th>
                                    <th className="p-4 font-bold text-black dark:text-white">Date</th>
                                    <th className="p-4 font-bold text-black dark:text-white">Status</th>
                                    <th className="p-4 font-bold text-black dark:text-white">Total</th>
                                    <th className="p-4 font-bold text-black dark:text-white">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-mono">{order.id.slice(0, 8)}...</td>
                                        <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'PAID' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                    order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                        'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4 font-bold">₹{Number(order.total).toFixed(2)}</td>
                                        <td className="p-4">
                                            <Link href={`/track/${order.id}`} className="text-primary hover:underline font-bold">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
