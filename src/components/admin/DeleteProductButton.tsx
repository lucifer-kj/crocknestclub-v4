"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deleteProduct } from "@/app/admin/products/actions"

export function DeleteProductButton({ id }: { id: string }) {
    async function handleDelete() {
        if (confirm("Are you sure you want to delete this product?")) {
            await deleteProduct(id)
        }
    }

    return (
        <Button variant="ghost" size="sm" onClick={handleDelete} className="text-destructive hover:text-destructive hover:bg-destructive/10">
            <Trash2 className="w-4 h-4" />
        </Button>
    )
}
