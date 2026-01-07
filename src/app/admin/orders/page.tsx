import { prisma } from "@/lib/prisma"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        include: { user: true, items: true }
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black uppercase tracking-tight">Orders</h1>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => {
                            const shippingInfo: any = order.shippingInfo;
                            return (
                                <TableRow key={order.id}>
                                    <TableCell className="font-mono">{order.id.slice(0, 8)}</TableCell>
                                    <TableCell>
                                        <div>{order.user?.name || shippingInfo?.name || "Guest"}</div>
                                        <div className="text-xs text-muted-foreground">{order.user?.email || shippingInfo?.email}</div>
                                    </TableCell>
                                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge variant={order.status === "SHIPPED" ? "default" : "secondary"}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{order.items.length} items</TableCell>
                                    <TableCell className="text-right font-medium">${Number(order.total).toFixed(2)}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
