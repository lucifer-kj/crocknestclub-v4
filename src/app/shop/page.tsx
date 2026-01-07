import { prisma } from "@/lib/prisma"
import { ProductCard } from "@/components/shop/ProductCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Ensure dynamic rendering to fetch fresh data
export const dynamic = 'force-dynamic'

interface ShopPageProps {
    searchParams: Promise<{
        category?: string
        sort?: string
    }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const params = await searchParams
    const categoryFilter = params.category
    const sortOption = params.sort

    // Fetch Categories for Sidebar
    const categories = await prisma.category.findMany()

    // Build Query
    const where: any = {}
    if (categoryFilter) {
        where.category = { slug: categoryFilter }
    }

    let orderBy: any = { createdAt: 'desc' }
    if (sortOption === 'price_asc') orderBy = { basePrice: 'asc' }
    if (sortOption === 'price_desc') orderBy = { basePrice: 'desc' }

    const products = await prisma.product.findMany({
        where,
        include: { category: true },
        orderBy
    })

    return (
        <div className="min-h-screen py-8 px-4 md:px-8 max-w-[1600px] mx-auto">
            <div className="flex flex-col gap-3 mb-12 text-center md:text-left border-b-2 border-black pb-8">
                <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter">
                    The <span className="text-primary">Stash</span>
                </h1>
                <p className="text-muted-foreground text-xl font-bold uppercase tracking-widest max-w-2xl">
                    Exclusive drops. Secured for the club.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
                    <div>
                        <h3 className="font-black text-xl uppercase mb-4 border-b-2 border-black pb-2">Categories</h3>
                        <div className="flex flex-col space-y-2">
                            <Link
                                href="/shop"
                                className={`text-lg font-bold uppercase hover:text-primary transition-colors ${!categoryFilter ? 'text-primary underline decoration-2 underline-offset-4' : ''}`}
                            >
                                All Drops
                            </Link>
                            {categories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/shop?category=${cat.slug}&sort=${sortOption || ''}`}
                                    className={`text-lg font-bold uppercase hover:text-primary transition-colors ${categoryFilter === cat.slug ? 'text-primary underline decoration-2 underline-offset-4' : ''}`}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-black text-xl uppercase mb-4 border-b-2 border-black pb-2">Sort By</h3>
                        <div className="flex flex-col space-y-2">
                            <Link href={`/shop?category=${categoryFilter || ''}&sort=newest`} className={`text-sm font-bold uppercase hover:text-primary ${!sortOption || sortOption === 'newest' ? 'text-primary' : ''}`}>Newest</Link>
                            <Link href={`/shop?category=${categoryFilter || ''}&sort=price_asc`} className={`text-sm font-bold uppercase hover:text-primary ${sortOption === 'price_asc' ? 'text-primary' : ''}`}>Price: Low to High</Link>
                            <Link href={`/shop?category=${categoryFilter || ''}&sort=price_desc`} className={`text-sm font-bold uppercase hover:text-primary ${sortOption === 'price_desc' ? 'text-primary' : ''}`}>Price: High to Low</Link>
                        </div>
                    </div>
                </aside>

                {/* Grid */}
                <div className="flex-1">
                    {products.length === 0 ? (
                        <div className="text-center py-20 border-2 border-black border-dashed bg-muted/20">
                            <p className="text-2xl font-bold uppercase text-muted-foreground">No drops match your filters.</p>
                            <Button asChild variant="link" className="mt-4 text-xl uppercase font-black">
                                <Link href="/shop">Clear Filters</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    title={product.title}
                                    price={Number(product.basePrice)}
                                    scarcityLevel={product.scarcityLevel}
                                    image={product.images[0]}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
