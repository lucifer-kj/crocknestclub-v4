import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Order, OrderStatus } from "@prisma/client"

interface OrderListProps {
    orders: (Order & {
        items: {
            quantity: number,
            productSnapshot: any
        }[]
    })[]
}

export function OrderList({ orders }: OrderListProps) {
    if (orders.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-lg font-bold">No orders found.</p>
                <Button className="mt-4 rounded-none border-2 border-black" asChild>
                    <Link href="/shop">Start Shopping</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b-2 border-black text-xs uppercase tracking-widest bg-muted/20">
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Total</th>
                        <th className="p-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-muted/5 transition-colors">
                            <td className="p-4 font-mono font-bold text-sm">#{order.id.slice(0, 8)}</td>
                            <td className="p-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className="p-4">
                                <Badge variant={order.status === "SHIPPED" || order.status === "PAID" ? "default" : "secondary"} className="rounded-none">
                                    {order.status}
                                </Badge>
                            </td>
                            <td className="p-4 font-mono">${Number(order.total).toFixed(2)}</td>
                            <td className="p-4 text-right">
                                <Button size="sm" variant="outline" className="rounded-none border-2 border-black/20 hover:border-black" asChild>
                                    <Link href={`/account/orders/${order.id}`}>View</Link>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
