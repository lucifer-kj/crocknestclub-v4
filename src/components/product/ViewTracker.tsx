"use client"

import { useEffect } from "react"

export function ViewTracker({ productId }: { productId: string }) {
    useEffect(() => {
        const stored = localStorage.getItem("recentlyViewed")
        let ids: string[] = stored ? JSON.parse(stored) : []

        // Remove if exists (to move to top)
        ids = ids.filter(id => id !== productId)

        // Add to front
        ids.unshift(productId)

        // Keep max 10
        ids = ids.slice(0, 10)

        localStorage.setItem("recentlyViewed", JSON.stringify(ids))
    }, [productId])

    return null
}
