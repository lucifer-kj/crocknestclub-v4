"use client"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart"
import { ShoppingBag } from "lucide-react"
import { useEffect, useState } from "react"

export function CartButton() {
    const { openCart, items } = useCartStore()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const count = items.reduce((acc, item) => acc + item.quantity, 0)

    if (!mounted) {
        return (
            <Button variant="outline" size="sm" className="relative">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Cart
            </Button>
        )
    }

    return (
        <Button variant="outline" size="sm" onClick={openCart} className="relative">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Cart
            {count > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {count}
                </span>
            )}
        </Button>
    )
}
