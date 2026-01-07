import { prisma } from "@/lib/prisma"
import { ProductGallery } from "@/components/shop/ProductGallery"
import { ProductInfo } from "@/components/shop/ProductInfo"
import { notFound } from "next/navigation"
import { ViewTracker } from "@/components/product/ViewTracker"

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params

    // Validate UUID format roughly to avoid prisma errors
    if (!id || id.length < 10) notFound()

    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            variants: true,
            category: true
        }
    })

    if (!product) {
        notFound()
    }

    return (
        <div className="min-h-screen py-10 md:py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <ViewTracker productId={product.id} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                <ProductGallery images={product.images} title={product.title} />
                <ProductInfo
                    id={product.id}
                    title={product.title}
                    basePrice={Number(product.basePrice)}
                    description={product.description}
                    scarcityLevel={product.scarcityLevel}
                    variants={product.variants}
                    images={product.images}
                />
            </div>
        </div>
    )
}
