import { prisma } from "@/lib/prisma"
import { ProductForm } from "@/components/admin/ProductForm"
import { createProduct } from "../actions"

export default async function NewProductPage() {
    const categories = await prisma.category.findMany()

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-black uppercase tracking-tight">New Product</h1>
            <ProductForm categories={categories} action={createProduct} />
        </div>
    )
}
