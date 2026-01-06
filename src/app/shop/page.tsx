import { prisma } from "@/lib/prisma"
import { ProductCard } from "@/components/shop/ProductCard"

// Ensure dynamic rendering to fetch fresh data
export const dynamic = 'force-dynamic'

export default async function ShopPage() {
    const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="min-h-screen py-16 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col gap-3 mb-12 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                    The <span className="text-primary">Stash</span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl">
                    Exclusive drops. Secured for the club. Once they're gone, they're gone.
                </p>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-20 border rounded-lg border-dashed">
                    <p className="text-xl text-muted-foreground">No drops available right now. Check back soon.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={`$${Number(product.basePrice).toFixed(2)}`}
                            scarcityLevel={product.scarcityLevel}
                            image={product.images[0]}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
