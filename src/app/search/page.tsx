import { prisma } from "@/lib/prisma"
import { ProductCard } from "@/components/shop/ProductCard"
import { SearchX } from "lucide-react"

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { q } = await searchParams
    const query = typeof q === "string" ? q : ""

    if (!query) {
        return (
            <div className="container min-h-[50vh] flex flex-col items-center justify-center text-center p-8">
                <SearchX className="h-16 w-16 text-muted-foreground mb-4" />
                <h1 className="text-2xl font-black uppercase mb-2">Start typing to search</h1>
                <p className="text-muted-foreground">Find apparel, digital goods, and more.</p>
            </div>
        )
    }

    const products = await prisma.product.findMany({
        where: {
            OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { category: { name: { contains: query, mode: 'insensitive' } } }
            ]
        },
        include: {
            category: true,
            // Assuming ProductCard needs this or we can adjust
        }
    })

    return (
        <div className="container py-12 px-4 md:px-6">
            <h1 className="text-3xl font-black uppercase tracking-tighter mb-8">
                Search Results: "{query}"
            </h1>

            {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-black/20 rounded-md">
                    <SearchX className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-xl font-bold uppercase text-muted-foreground">No products found</p>
                    <p>Try checking your spelling or using different keywords.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={Number(product.basePrice)}
                            scarcityLevel={product.scarcityLevel}
                            image={product.images[0] || ""}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
