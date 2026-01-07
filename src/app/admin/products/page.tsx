import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"
import Link from "next/link"
import { DeleteProductButton } from "@/components/admin/DeleteProductButton"

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black uppercase tracking-tight">Products</h1>
                <Button className="gap-2" asChild>
                    <Link href="/admin/products/new">
                        <Plus className="h-4 w-4" />
                        Add Product
                    </Link>
                </Button>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock (All Variants)</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <div className="h-10 w-10 bg-muted rounded overflow-hidden">
                                        {product.images[0] && <img src={product.images[0]} className="h-full w-full object-cover" alt="" />}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{product.title}</TableCell>
                                <TableCell>{product.category?.name || "Uncategorized"}</TableCell>
                                <TableCell>${Number(product.basePrice).toFixed(2)}</TableCell>
                                <TableCell>N/A</TableCell> {/* Need to fetch variants count */}
                                <TableCell className="text-right space-x-2">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                                    </Button>
                                    <DeleteProductButton id={product.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
