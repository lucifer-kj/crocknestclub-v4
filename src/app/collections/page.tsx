import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default async function CollectionsPage() {
    const categories = await prisma.category.findMany({
        include: {
            products: {
                take: 1,
                orderBy: { createdAt: 'desc' },
                select: { images: true }
            }
        }
    })

    return (
        <div className="container py-12 px-4 md:px-6">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-8">Collections</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category) => {
                    // Use first product image or fallback
                    const coverImage = category.products[0]?.images[0] ||
                        `https://placehold.co/600x400/000000/FFFFFF/png?text=${encodeURIComponent(category.name)}`

                    return (
                        <Link key={category.id} href={`/shop?category=${category.slug}`} className="group block h-full">
                            <Card className="h-full rounded-none border-2 border-black overflow-hidden transition-all hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                                <div className="aspect-video relative overflow-hidden bg-muted">
                                    <img
                                        src={coverImage}
                                        alt={category.name}
                                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">{category.name}</h2>
                                        <div className="flex items-center gap-2 font-bold uppercase tracking-wide text-sm opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                            Explore <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
