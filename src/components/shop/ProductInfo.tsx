"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/store/cart"
import { cn } from "@/lib/utils"

// Prisma Types workaround. Ideally import from generated types but manual for now.
interface Variant {
    id: string
    size: string
    color: string
    stock: number
    sku: string
}

interface ProductInfoProps {
    id: string
    title: string
    basePrice: number
    description: string
    scarcityLevel: string
    variants: Variant[]
    images: string[]
}

export function ProductInfo({ id, title, basePrice, description, scarcityLevel, variants, images }: ProductInfoProps) {
    // Group variants by Size or Color if needed. For simplicity assuming minimal unique variations.
    // Let's assume Color is consistent or we just pick specific variants.
    // For a simple merch drop, usually Size is the main variable per product entry (if color is same).

    // Group by Size
    const sizes = Array.from(new Set(variants.map(v => v.size))).sort()
    const [selectedSize, setSelectedSize] = useState<string | null>(sizes[0] || null)

    // Should also handle color selection if multiple colors exists

    // Find selected variant
    const selectedVariant = variants.find(v => v.size === selectedSize) // Simplified: taking first match for size.

    const { addItem } = useCartStore()

    const handleAddToCart = () => {
        if (!selectedVariant) return

        addItem({
            variantId: selectedVariant.id,
            productId: id,
            title: title,
            price: Number(basePrice),
            image: images[0],
            size: selectedVariant.size,
            color: selectedVariant.color,
            quantity: 1
        })
    }

    const isOutOfStock = selectedVariant ? selectedVariant.stock <= 0 : true

    return (
        <div className="flex flex-col gap-8">
            <div className="space-y-4 border-b-2 border-black pb-8">
                <div className="flex items-center gap-2">
                    {scarcityLevel === "HIGH" && <Badge className="bg-secondary text-secondary-foreground border-2 border-black rounded-none uppercase px-3 py-1">Limited Edition</Badge>}
                    <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{variants.length > 0 ? "Available Now" : "Sold Out"}</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">{title}</h1>
                <p className="text-3xl font-mono font-bold">${Number(basePrice).toFixed(2)}</p>
            </div>

            <p className="text-lg leading-relaxed font-medium">
                {description}
            </p>

            <div className="space-y-6">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold uppercase tracking-wider">Select Size</span>
                        <span className="text-sm text-primary font-bold uppercase cursor-pointer hover:underline decoration-2 underline-offset-4">Size Guide</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {sizes.map((size) => {
                            const variant = variants.find(v => v.size === size)
                            const disabled = !variant || variant.stock <= 0
                            return (
                                <button
                                    key={size}
                                    onClick={() => !disabled && setSelectedSize(size)}
                                    disabled={disabled}
                                    className={cn(
                                        "flex items-center justify-center border-2 py-4 text-base font-bold transition-all uppercase",
                                        selectedSize === size
                                            ? "border-black bg-primary text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                            : "border-border bg-transparent hover:border-black hover:bg-muted",
                                        disabled && "cursor-not-allowed opacity-50 bg-muted/50 border-border border-dashed"
                                    )}
                                >
                                    {size}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            <Button
                size="lg"
                className="w-full h-16 text-xl font-black uppercase tracking-widest rounded-none border-2 border-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                onClick={handleAddToCart}
                disabled={!selectedVariant || isOutOfStock}
            >
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>

            <div className="flex flex-col gap-2 pt-4 text-xs font-bold uppercase tracking-widest text-muted-foreground border-t-2 border-black/10">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Secure Checkout
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Ships within 24 hours
                </div>
            </div>
        </div>
    )
}
