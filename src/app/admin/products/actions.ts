"use server"

import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const productSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    basePrice: z.coerce.number().min(0, "Price must be positive"),
    scarcityLevel: z.enum(["LOW", "MEDIUM", "HIGH"]),
    categoryId: z.string().min(1, "Category is required"),
    image1: z.string().url("Invalid URL").optional().or(z.literal("")),
    image2: z.string().url("Invalid URL").optional().or(z.literal("")),
    image3: z.string().url("Invalid URL").optional().or(z.literal("")),
})

export async function updateProduct(id: string, formData: FormData) {
    const rawData = {
        title: formData.get("title"),
        description: formData.get("description"),
        basePrice: formData.get("basePrice"),
        scarcityLevel: formData.get("scarcityLevel"),
        categoryId: formData.get("categoryId"),
        image1: formData.get("image1"),
        image2: formData.get("image2"),
        image3: formData.get("image3"),
    }

    const validated = productSchema.safeParse(rawData)

    if (!validated.success) {
        return { success: false, errors: validated.error.flatten().fieldErrors }
    }

    const { image1, image2, image3, ...data } = validated.data
    const images = [image1, image2, image3].filter(Boolean) as string[]

    await prisma.product.update({
        where: { id },
        data: {
            ...data,
            images
        }
    })

    revalidatePath("/admin/products")
    revalidatePath("/shop")
    redirect("/admin/products")
}

export async function createProduct(formData: FormData) {
    const rawData = {
        title: formData.get("title"),
        description: formData.get("description"),
        basePrice: formData.get("basePrice"),
        scarcityLevel: formData.get("scarcityLevel"),
        categoryId: formData.get("categoryId"),
        image1: formData.get("image1"),
        image2: formData.get("image2"),
        image3: formData.get("image3"),
    }

    const validated = productSchema.safeParse(rawData)

    if (!validated.success) {
        return { success: false, errors: validated.error.flatten().fieldErrors }
    }

    const { image1, image2, image3, ...data } = validated.data
    const images = [image1, image2, image3].filter(Boolean) as string[]

    await prisma.product.create({
        data: {
            ...data,
            images,
            // Create default variants for now to ensure product is buyable
            variants: {
                createMany: {
                    data: [
                        { size: "M", color: "Default", stock: 10, sku: `${data.title.slice(0, 3).toUpperCase()}-${Date.now()}-M` },
                        { size: "L", color: "Default", stock: 10, sku: `${data.title.slice(0, 3).toUpperCase()}-${Date.now()}-L` }
                    ]
                }
            }
        }
    })

    revalidatePath("/admin/products")
    revalidatePath("/shop")
    redirect("/admin/products")
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({ where: { id } })
        revalidatePath("/admin/products")
        revalidatePath("/shop")
        return { success: true }
    } catch (error) {
        return { success: false, error: "Failed to delete" }
    }
}
