"use client";

import { useEffect } from "react";

interface ProductData {
    id: string;
    title: string;
    price: string;
    image: string;
    category?: string;
}

export function RecentlyViewedTracker({ product }: { product: ProductData }) {
    useEffect(() => {
        try {
            const stored = localStorage.getItem("recentlyViewed");
            let items: ProductData[] = stored ? JSON.parse(stored) : [];

            // Remove if already exists (to move to top)
            items = items.filter(item => item.id !== product.id);

            // Add to beginning
            items.unshift(product);

            // Limit to 5 items
            if (items.length > 5) {
                items = items.slice(0, 5);
            }

            localStorage.setItem("recentlyViewed", JSON.stringify(items));
        } catch (e) {
            console.error("Failed to update recently viewed items", e);
        }
    }, [product]);

    return null;
}
