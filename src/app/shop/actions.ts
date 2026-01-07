"use server"

import { prisma } from "@/lib/prisma"

export async function getProductsByIds(ids: string[]) {
    if (!ids || ids.length === 0) return []

    try {
        const products = await prisma.product.findMany({
            where: {
                id: { in: ids }
            },
            take: 4 // Limit to 4 for "Recently Viewed"
        })

        // Sort by input order (reverse chronological usually)
        return products.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
    } catch (error) {
        console.error("Failed to fetch recently viewed:", error)
        return []
    }
}
