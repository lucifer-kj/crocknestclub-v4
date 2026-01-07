import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { OrderList } from "@/components/account/OrderList"

export default async function OrderHistoryPage() {
    const session = await auth()
    if (!session?.user?.email) return null

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    })

    const orders = await prisma.order.findMany({
        where: { userId: user?.id },
        orderBy: { createdAt: 'desc' },
        include: { items: true }
    })

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-black uppercase tracking-tighter border-b-2 border-black pb-4">Order History</h1>
            <OrderList orders={orders} />
        </div>
    )
}
