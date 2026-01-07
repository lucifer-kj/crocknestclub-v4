"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart"
import { ShoppingBag, Plus } from "lucide-react"

// Use console log if toast not found or check package.json for sonner. package.json didn't list sonner but radix-ui/react-toast might be there. 
// I'll skip toast for this step and just animate the button.

interface ProductCardProps {
    id: string
    title: string
    price: number | string // Handle both
    scarcityLevel: string
    image: string
}

export function ProductCard({ id, title, price, scarcityLevel, image }: ProductCardProps) {
    const { addItem, openCart } = useCartStore()

    // Parse price if string
    const priceNum = typeof price === 'string' ? parseFloat(price) : price
    const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(priceNum)

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
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
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                            loading="lazy"
                            onError={(e) => {
                                e.currentTarget.src = `https://placehold.co/600x600/000000/FFFFFF/png?text=${encodeURIComponent(title)}`
                            }}
                        />

                        {scarcityLevel === "HIGH" && (
                            <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground border-2 border-black rounded-none">
                                LIMITED
                            </Badge>
                        )}
                        {scarcityLevel === "MEDIUM" && (
                            <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground border-2 border-black rounded-none">
                                HOT
                            </Badge>
                        )}
                    </div>
                </Link>
            </CardHeader>
            <CardContent className="p-4 space-y-1">
                <Link href={`/shop/${id}`} className="block">
                    <h3 className="text-lg font-black uppercase tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                </Link>
                <p className="text-xl font-mono font-bold">{formattedPrice}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 gap-2">
                <Button variant="outline" className="flex-1 font-bold uppercase tracking-wide rounded-none border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary" asChild>
                    <Link href={`/shop/${id}`}>View</Link>
                </Button>
                <Button
                    size="icon"
                    className="rounded-none border-2 border-black bg-black text-white hover:bg-primary hover:text-black hover:border-black transition-colors"
                    onClick={handleQuickAdd}
                >
                    <Plus className="h-5 w-5" />
                    <span className="sr-only">Add to Cart</span>
                </Button>
            </CardFooter>
        </Card>
    )
}
