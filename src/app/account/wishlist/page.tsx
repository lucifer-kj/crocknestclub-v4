import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { ProductCard } from "@/components/shop/ProductCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function WishlistPage() {
    const session = await auth()
    if (!session?.user?.email) return null

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            wishlist: {
                include: {
                    items: {
                        include: {
                            product: true
                        }
                    }
                }
            }
        }
    })

    const wishlistItems = user?.wishlist?.items || []

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-black uppercase tracking-tighter border-b-2 border-black pb-4">My Wishlist</h1>

            {wishlistItems.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">Your wishlist is empty.</p>
                    <Button className="rounded-none border-2 border-black" asChild>
                        <Link href="/shop">Go Shopping</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                        <ProductCard
                            key={item.id}
                            id={item.product.id}
                            title={item.product.title}
                            price={Number(item.product.basePrice)}
                            image={item.product.images[0]}
                            scarcityLevel={item.product.scarcityLevel}
                            isWishlisted={true} // It's in the wishlist page, so it's wishlisted
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
