import { prisma } from "@/lib/prisma"
import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await prisma.product.findMany({
        select: { id: true, updatedAt: true }
    })

    const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
        url: `https://loudmerch.com/shop/${product.id}`,
        lastModified: product.updatedAt,
        changeFrequency: 'daily',
        priority: 0.8,
    }))

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: 'https://loudmerch.com',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://loudmerch.com/shop',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: 'https://loudmerch.com/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://loudmerch.com/contact',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://loudmerch.com/drops',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        }
    ]

    return [...staticPages, ...productEntries]
}
