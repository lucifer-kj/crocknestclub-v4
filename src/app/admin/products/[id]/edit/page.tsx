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
        <div className="space-y-6">
            <h1 className="text-3xl font-black uppercase tracking-tight">Edit Product</h1>
            <ProductForm categories={categories} product={product} action={updateAction} />
        </div>
    )
}
