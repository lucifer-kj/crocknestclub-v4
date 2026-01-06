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
        <div className="flex flex-col gap-6">
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    {scarcityLevel === "HIGH" && <Badge variant="destructive" className="animate-pulse">Limited Edition</Badge>}
                    <span className="text-sm font-medium text-muted-foreground">{variants.length > 0 ? "Available Now" : "Sold Out"}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">{title}</h1>
                <p className="text-2xl font-medium">${Number(basePrice).toFixed(2)}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
                {description}
            </p>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Size</span>
                    <span className="text-sm text-muted-foreground cursor-pointer underline">Size Guide</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => {
                        const variant = variants.find(v => v.size === size)
                        const disabled = !variant || variant.stock <= 0
                        return (
                            <button
                                key={size}
                                onClick={() => !disabled && setSelectedSize(size)}
                                disabled={disabled}
                                className={cn(
                                    "flex items-center justify-center rounded-md border py-3 text-sm font-medium transition-all hover:bg-accent",
                                    selectedSize === size ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90" : "bg-transparent",
                                    disabled && "cursor-not-allowed opacity-50 bg-muted hover:bg-muted"
                                )}
                            >
                                {size}
                            </button>
                        )
                    })}
                </div>
            </div>

            <Button
                size="lg"
                className="w-full h-14 text-lg font-bold uppercase tracking-wide"
                onClick={handleAddToCart}
                disabled={!selectedVariant || isOutOfStock}
            >
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>

            <div className="text-xs text-muted-foreground text-center uppercase tracking-widest">
                Free shipping on orders over $150
            </div>
        </div>
    )
}
