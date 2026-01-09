"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart"
import { ShoppingBag, Plus } from "lucide-react"
import { WishlistButton } from "@/components/wishlist/WishlistButton"

import useSWR from "swr"

interface ProductCardProps {
    id: string
    title: string
    price: number | string
    scarcityLevel: string
    image: string
    isWishlisted?: boolean
    initialStock?: number
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function ProductCard({ id, title, price, scarcityLevel, image, isWishlisted = false, initialStock }: ProductCardProps) {
    const { addItem, openCart } = useCartStore()

    const { data } = useSWR(`/api/products/stock?ids=${id}`, fetcher, {
        refreshInterval: 10000,
        fallbackData: initialStock !== undefined ? { [id]: initialStock } : undefined
    })

    const stock = data?.[id]
    const isOutOfStock = stock === 0
    const isLowStock = stock !== undefined && stock > 0 && stock <= 5

    // Parse price if string
    const priceNum = typeof price === 'string' ? parseFloat(price) : price
    const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(priceNum)

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (isOutOfStock) return

        addItem({
            variantId: `${id}-default`, // Placeholder variant logic, ideally pass variant
            productId: id,
            title,
            price: priceNum,
            image,
            size: 'M', // Default
            color: 'Default',
            quantity: 1
        })
        openCart()
    }

    return (
        <Card className="group relative overflow-hidden rounded-none border-2 border-border bg-card transition-all hover:border-primary hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <CardHeader className="p-0 border-b-2 border-border group-hover:border-primary transition-colors">
                <Link href={`/shop/${id}`}>
                    <div className="aspect-square relative overflow-hidden bg-muted">
                        <img
                            src={image || `https://placehold.co/600x600/000000/FFFFFF/png?text=${encodeURIComponent(title)}`}
                            alt={title}
                            className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0 ${isOutOfStock ? 'opacity-50' : ''}`}
                            loading="lazy"
                            onError={(e) => {
                                e.currentTarget.src = `https://placehold.co/600x600/000000/FFFFFF/png?text=${encodeURIComponent(title)}`
                            }}
                        />

                        {isOutOfStock && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                                <span className="bg-red-600 text-white px-3 py-1 font-black uppercase text-xl transform -rotate-12 border-2 border-white">
                                    SOLD OUT
                                </span>
                            </div>
                        )}

                        <div className="absolute top-2 right-2 z-10">
                            <WishlistButton productId={id} initialIsWishlisted={isWishlisted} className="bg-background/80 backdrop-blur border-2 border-black hover:bg-background shadow-sm" />
                        </div>

                        {/* Status Badges */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                            {isLowStock && !isOutOfStock && (
                                <Badge className="bg-orange-500 text-white border-2 border-black rounded-none animate-pulse">
                                    LOW STOCK: {stock} LEFT
                                </Badge>
                            )}
                            {!isOutOfStock && scarcityLevel === "HIGH" && (
                                <Badge className="bg-secondary text-secondary-foreground border-2 border-black rounded-none">
                                    LIMITED
                                </Badge>
                            )}
                            {!isOutOfStock && scarcityLevel === "MEDIUM" && (
                                <Badge className="bg-primary text-primary-foreground border-2 border-black rounded-none">
                                    HOT
                                </Badge>
                            )}
                        </div>
                    </div>
                </Link>
            </CardHeader>
            <CardContent className="p-4 space-y-1">
                <Link href={`/shop/${id}`} className="block">
                    <h3 className="text-lg font-black uppercase tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                </Link>
                <div className="flex justify-between items-center">
                    <p className="text-xl font-mono font-bold">{formattedPrice}</p>
                    {isOutOfStock && <span className="text-xs font-bold text-red-500">Out of Stock</span>}
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 gap-2">
                <Button variant="outline" className="flex-1 font-bold uppercase tracking-wide rounded-none border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary" asChild>
                    <Link href={`/shop/${id}`}>View</Link>
                </Button>
                <Button
                    size="icon"
                    className="rounded-none border-2 border-black bg-black text-white hover:bg-primary hover:text-black hover:border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleQuickAdd}
                    disabled={isOutOfStock}
                >
                    <Plus className="h-5 w-5" />
                    <span className="sr-only">Add to Cart</span>
                </Button>
            </CardFooter>
        </Card>
    )
}
