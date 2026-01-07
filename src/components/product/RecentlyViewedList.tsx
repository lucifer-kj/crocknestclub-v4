"use client";

import { useEffect, useState } from "react";
import { StitchProductCard } from "@/components/shop/StitchProductCard";

interface ProductData {
    id: string;
    title: string;
    price: string;
    image: string;
    category?: string;
}

export function RecentlyViewedList() {
    const [items, setItems] = useState<ProductData[]>([]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("recentlyViewed");
            if (stored) {
                setItems(JSON.parse(stored));
            }
        } catch (e) {
            console.error("Failed to load recently viewed items", e);
        }
    }, []);

    if (items.length === 0) return null;

    return (
        <section className="mt-24 pt-12 border-t border-gray-100 dark:border-white/10">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-8">Recently Viewed</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {items.map((product) => (
                    <StitchProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        image={product.image}
                        category={product.category}
                    />
                ))}
            </div>
        </section>
    );
}
