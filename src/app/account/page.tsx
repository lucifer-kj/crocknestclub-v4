import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { OrderList } from "@/components/account/OrderList"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function AccountPage() {
    const session = await auth()
    if (!session?.user?.email) return null

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { addresses: { where: { isDefault: true } } }
    })

    const recentOrders = await prisma.order.findMany({
        where: { userId: user?.id },
        orderBy: { createdAt: 'desc' },
        take: 3,
        include: { items: true }
    })

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter">Welcome Back, {user?.name || "Member"}</h1>
                    <p className="text-muted-foreground">{user?.email}</p>
                </div>
                <Button className="rounded-none border-2 border-black font-bold" asChild>
                    <Link href="/shop">Browse Shop</Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Quick Stats or Addresses */}
                <div className="md:col-span-2 space-y-6">
                    <div className="flex items-center justify-between border-b-2 border-black pb-4">
                        <h2 className="text-xl font-bold uppercase">Recent Orders</h2>
                        <Link href="/account/orders" className="text-sm font-bold underline hover:text-primary">View All</Link>
                    </div>
                    <OrderList orders={recentOrders} />
                </div>

                <div className="space-y-6">
                    <div className="border-2 border-black bg-muted/20 p-6">
                        <h3 className="font-black uppercase text-lg mb-4">Default Address</h3>
                        {user?.addresses[0] ? (
                            <div className="text-sm space-y-1">
                                <p className="font-bold">{user.name}</p>
                                <p>{user.addresses[0].line1}</p>
                                <p>{user.addresses[0].city}, {user.addresses[0].state} {user.addresses[0].postalCode}</p>
                                <p>{user.addresses[0].country}</p>
                            </div>
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-sm text-muted-foreground mb-4">No default address set.</p>
                                <Button size="sm" variant="outline" className="w-full rounded-none border-2 border-black" asChild>
                                    <Link href="/account/addresses">Add Address</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
