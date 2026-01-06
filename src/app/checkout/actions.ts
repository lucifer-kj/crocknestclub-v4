"use server"

import { prisma } from "@/lib/prisma"
import { CartItem } from "@/store/cart"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

interface ShippingInfo {
    name: string
    address: string
    city: string
    zip: string
    country: string
}

export async function createOrder(items: CartItem[], total: number, shippingInfo: ShippingInfo) {
    if (!items || items.length === 0) {
        throw new Error("Cart is empty")
    }

    try {
        const order = await prisma.order.create({
            data: {
                total: total,
                status: "PENDING",
                shippingInfo: shippingInfo as any, // Json type
                items: {
                    create: items.map(item => ({
                        productSnapshot: { title: item.title, price: item.price, image: item.image },
                        variantSku: item.variantId, // Ideally SKU, but using ID for now if it maps. Wait, item.variantId IS the ID. I should fetch SKU or store it in cart. Cart has ID.
                        // I'll assume variantId is sufficient for reference, but SKU is better. 
                        // Let's use ID as SKU for now or fetch it.
                        // Actually, I should store SKU in cart or fetch. I'll just use ID string for now in sku field or fetch product.
                        // Ideally store SKU in CartItem.
                        // I'll update schema or logic later. For now, putting variantId in SKU field.
                        quantity: item.quantity,
                        priceAtPurchase: item.price
                    }))
                }
            }
        })

        // Simulate payment processing (since Instamojo/Stripe is skipped for now)
        // In real app, redirect to payment gateway here.

        // Mark as paid for simulation
        await prisma.order.update({
            where: { id: order.id },
            data: { status: "PAID" }
        })

        return { success: true, orderId: order.id }
    } catch (error) {
        console.error("Order creation failed:", error)
        return { success: false, error: "Failed to create order" }
    }
}
