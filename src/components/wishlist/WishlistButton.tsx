"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { toggleWishlist } from "@/app/account/wishlist/actions"
import { cn } from "@/lib/utils"
// import { toast } from "sonner" // Skipping toast for now as per previous fix

export function WishlistButton({ productId, initialIsWishlisted = false, className }: { productId: string, initialIsWishlisted?: boolean, className?: string }) {
    const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted)
    const [isLoading, setIsLoading] = useState(false)

    const handleToggle = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsLoading(true)

        const newState = !isWishlisted
        setIsWishlisted(newState) // Optimistic

        try {
            const result = await toggleWishlist(productId)
            if (!result.success) {
                // Revert
                setIsWishlisted(!newState)
                // alert("Failed to update wishlist") // Optional: silent fail or alert
                console.error(result.error)
            }
        } catch (error) {
            setIsWishlisted(!newState)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <button
            type="button"
            onClick={handleToggle}
            disabled={isLoading}
            className={cn(
                "p-2 rounded-full transition-transform hover:scale-110 active:scale-95",
                className
            )}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
            <Heart
                className={cn(
                    "w-6 h-6 transition-colors",
                    isWishlisted ? "fill-primary text-primary" : "text-muted-foreground hover:text-primary"
                )}
            />
        </button>
    )
}
