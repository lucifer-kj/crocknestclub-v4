"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Category, Product, ScarcityLevel } from "@prisma/client"
import { useActionState } from "react" // React 19 hook
// Note: In Next.js 15/React 19, useActionState replaces useFormState. 
// If specific version issues arise, we might map to the available hook.

interface ProductFormProps {
    categories: Category[]
    product?: Product
    action: (prevState: any, formData: FormData) => Promise<any>
}

const initialState = {
    success: false,
    errors: {} as Record<string, string[]>
}

export function ProductForm({ categories, product, action }: ProductFormProps) {
    const [state, formAction, pending] = useActionState(action, initialState)

    return (
        <form action={formAction} className="space-y-8 max-w-2xl bg-card border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="space-y-2">
                <Label htmlFor="title" className="uppercase font-bold">Title</Label>
                <Input
                    id="title"
                    name="title"
                    defaultValue={product?.title}
                    className="rounded-none border-2 border-black"
                />
                {state.errors?.title && <p className="text-red-500 text-sm font-bold">{state.errors.title[0]}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description" className="uppercase font-bold">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    defaultValue={product?.description}
                    className="rounded-none border-2 border-black min-h-[100px]"
                />
                {state.errors?.description && <p className="text-red-500 text-sm font-bold">{state.errors.description[0]}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="basePrice" className="uppercase font-bold">Price ($)</Label>
                    <Input
                        id="basePrice"
                        name="basePrice"
                        type="number"
                        step="0.01"
                        defaultValue={product ? Number(product.basePrice) : ""}
                        className="rounded-none border-2 border-black"
                    />
                    {state.errors?.basePrice && <p className="text-red-500 text-sm font-bold">{state.errors.basePrice[0]}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="scarcityLevel" className="uppercase font-bold">Scarcity</Label>
                    <Select name="scarcityLevel" defaultValue={product?.scarcityLevel || "medium"}>
                        <SelectTrigger className="rounded-none border-2 border-black">
                            <SelectValue placeholder="Select Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="LOW">Low (Common)</SelectItem>
                            <SelectItem value="MEDIUM">Medium</SelectItem>
                            <SelectItem value="HIGH">High (Rare)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="categoryId" className="uppercase font-bold">Category</Label>
                <Select name="categoryId" defaultValue={product?.categoryId || undefined}>
                    <SelectTrigger className="rounded-none border-2 border-black">
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {state.errors?.categoryId && <p className="text-red-500 text-sm font-bold">{state.errors.categoryId[0]}</p>}
            </div>

            <div className="space-y-4 border-t-2 border-black pt-4">
                <p className="font-black uppercase">Images (URLs)</p>
                <div className="space-y-2">
                    <Label className="text-xs font-mono">Image 1 (Main)</Label>
                    <Input name="image1" defaultValue={product?.images[0]} placeholder="https://..." className="rounded-none border-2 border-black" />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-mono">Image 2</Label>
                    <Input name="image2" defaultValue={product?.images[1]} placeholder="https://..." className="rounded-none border-2 border-black" />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-mono">Image 3</Label>
                    <Input name="image3" defaultValue={product?.images[2]} placeholder="https://..." className="rounded-none border-2 border-black" />
                </div>
            </div>

            <Button type="submit" disabled={pending} className="w-full rounded-none border-2 border-black text-lg h-12">
                {pending ? "Saving..." : (product ? "Update Product" : "Create Product")}
            </Button>

            {state.error && <p className="text-red-500 font-bold text-center">{state.error}</p>}
        </form>
    )
}
