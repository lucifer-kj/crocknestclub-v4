import { prisma } from "@/lib/prisma"
import { ProductForm } from "@/components/admin/ProductForm"
import { createProduct } from "../actions"

export default async function NewProductPage() {
    const categories = await prisma.category.findMany()

    return (
        <div className="flex flex-col gap-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col gap-1">
                <h1 className="text-black dark:text-white text-3xl font-black tracking-[-0.03em] leading-tight" >New Product</h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Add a new item to the store inventory</p>
            </div>
            <ProductForm categories={categories} action={createProduct} />
        </div>
    )
}
