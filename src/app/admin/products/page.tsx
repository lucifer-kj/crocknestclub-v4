import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { DeleteProductButton } from "@/components/admin/DeleteProductButton"

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="flex flex-col gap-8 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black uppercase tracking-tight text-black dark:text-white">Products</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Manage your product inventory</p>
                </div>
                <Link href="/admin/products/new" className="flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-black text-white hover:bg-gray-800 text-sm font-bold shadow-lg shadow-gray-200 dark:shadow-none transition-all">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    <span>Add Product</span>
                </Link>
            </div>

            {/* Products Table */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Image</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                            {products.map((product) => (
                                <tr key={product.id} className="group hover:bg-primary/5 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                                            {product.images[0] ? (
                                                <img src={product.images[0]} className="h-full w-full object-cover" alt="" />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-gray-400 bg-gray-50">
                                                    <span className="material-symbols-outlined text-sm">image</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">{product.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                                            {product.category?.name || "Uncategorized"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">${Number(product.basePrice).toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">N/A</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center justify-end gap-2">
                                        <Link href={`/admin/products/${product.id}/edit`} className="text-gray-400 hover:text-primary transition-colors p-1">
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </Link>
                                        <DeleteProductButton id={product.id} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
