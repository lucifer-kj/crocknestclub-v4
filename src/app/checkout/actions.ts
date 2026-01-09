"use server"

import { prisma } from "@/lib/prisma"
import { CartItem } from "@/store/cart"
import { revalidatePath } from "next/cache"

interface ShippingInfo {
    name: string
    address: string
    city: string
    zip: string
    country: string
    email: string
}

export async function createOrder(items: CartItem[], _clientTotal: number, shippingInfo: ShippingInfo) {
    if (!items || items.length === 0) {
        throw new Error("Cart is empty")
    }

    try {
        // Server-Side Price Calculation & Inventory Locking (P0 Security Fix)
        const order = await prisma.$transaction(async (tx) => {
            let calculatedTotal = 0
            const secureItems = []

            for (const item of items) {
                const variant = await tx.variant.findUnique({
                    where: { id: item.variantId },
                    include: { product: true }
                })

                if (!variant) {
                    throw new Error(`Product variant not found: ${item.title}`)
                }

                // Inventory Lock: Decrement stock
                if (variant.stock < item.quantity) {
                    throw new Error(`Insufficient stock for ${variant.product.title} (${variant.size}/${variant.color})`)
                }

                // Double Locking: Ensure Product total stock also has availability
                // This covers the case where Admin updated Product stock but not Variants
                if (variant.product.stock < item.quantity) {
                    throw new Error(`Insufficient total stock for ${variant.product.title}`)
                }

                await tx.variant.update({
                    where: { id: variant.id },
                    data: { stock: { decrement: item.quantity } }
                })

                await tx.product.update({
                    where: { id: variant.product.id },
                    data: { stock: { decrement: item.quantity } }
                })

                const price = Number(variant.product.basePrice)
                calculatedTotal += price * item.quantity

                secureItems.push({
                    productSnapshot: {
                        title: variant.product.title,
                        price: price,
                        image: variant.product.images[0] || ""
                    },
                    variantSku: variant.sku,
                    quantity: item.quantity,
                    priceAtPurchase: price
                })
            }

            return await tx.order.create({
                data: {
                    total: calculatedTotal,
                    status: "PENDING",
                    user: undefined, // Guest checkout
                    shippingInfo: shippingInfo as any,
                    items: {
                        create: secureItems
                    }
                }
            })
        })

        // Instamojo Integration
        const API_KEY = process.env.INSTAMOJO_API_KEY
        const AUTH_TOKEN = process.env.INSTAMOJO_AUTH_TOKEN
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

        if (API_KEY && AUTH_TOKEN) {
            console.log("Initiating Instamojo Payment (INR)...")
            const payload = new URLSearchParams()
            payload.append("purpose", `Order #${order.id.substring(0, 8)}`)
            payload.append("amount", order.total.toFixed(2))
            payload.append("buyer_name", shippingInfo.name)
            payload.append("email", shippingInfo.email)
            payload.append("phone", "9999999999")
            payload.append("redirect_url", `${BASE_URL}/checkout/success?orderId=${order.id}`)
            payload.append("send_email", "True")
            payload.append("webhook", `${BASE_URL}/api/webhook/instamojo`)
            payload.append("allow_repeated_payments", "False")

            // Note: Instamojo currency defaults to INR.

            const response = await fetch("https://www.instamojo.com/api/1.1/payment-requests/", {
                method: "POST",
                headers: {
                    "X-Api-Key": API_KEY,
                    "X-Auth-Token": AUTH_TOKEN
                },
                body: payload
            })

            const data = await response.json()
            console.log("Instamojo Response:", data)

            if (data.success) {
                const longUrl = data.payment_request.longurl
                await prisma.order.update({
                    where: { id: order.id },
                    data: {
                        paymentId: data.payment_request.id,
                        paymentInfo: data as any
                    }
                })
                return { success: true, orderId: order.id, redirectUrl: longUrl }
            } else {
                console.error("Instamojo Error:", data)
                throw new Error(JSON.stringify(data.message) || "Payment initiation failed")
            }
        } else {
            console.warn("Instamojo Keys missing. Simulating success (Dev Mode).")

            // In dev mode, we auto-confirm
            await prisma.order.update({
                where: { id: order.id },
                data: { status: "PAID" }
            })

            return { success: true, orderId: order.id }
        }
    } catch (error: any) {
        console.error("Order creation failed:", error)
        return { success: false, error: error.message || "Failed to create order" }
    }
}
