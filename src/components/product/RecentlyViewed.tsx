"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/shop/ProductCard"
import { getProductsByIds } from "@/app/shop/actions"
import { Product } from "@prisma/client"

export function RecentlyViewed() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const stored = localStorage.getItem("recentlyViewed")
                if (!stored) {
                    setLoading(false)
                    return
                }

                const ids = JSON.parse(stored)
                if (Array.isArray(ids) && ids.length > 0) {
                    const data = await getProductsByIds(ids)
                    setProducts(data)
                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (loading || products.length === 0) return null

    return (
        <section className="py-12 border-t-2 border-black space-y-8 container px-4 md:px-6">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Recently Viewed</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={Number(product.basePrice)}
                        scarcityLevel={product.scarcityLevel}
                        image={product.images[0] || ""}
                    />
                ))}
            </div>
        </section>
    )
}
