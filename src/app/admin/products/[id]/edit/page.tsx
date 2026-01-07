import { prisma } from "@/lib/prisma"
import { ProductForm } from "@/components/admin/ProductForm"
import { updateProduct } from "../../actions"
import { notFound } from "next/navigation"

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
    return []
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    // Promise.all for parallel fetching
    const [product, categories] = await Promise.all([
        prisma.product.findUnique({ where: { id } }),
        prisma.category.findMany()
    ])

    if (!product) notFound()

    // Bind ID to the server action
    const updateAction = updateProduct.bind(null, id)

    return (
        <div className="flex flex-col gap-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col gap-1">
                <h1 className="text-black dark:text-white text-3xl font-black tracking-[-0.03em] leading-tight" >Edit Product</h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Update details for {product.title}</p>
            </div>
            <ProductForm categories={categories} product={product} action={updateAction} />
        </div>
    )
}
