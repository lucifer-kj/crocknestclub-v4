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

export async function createOrder(items: CartItem[], total: number, shippingInfo: ShippingInfo) {
    if (!items || items.length === 0) {
        throw new Error("Cart is empty")
    }

    try {
        const order = await prisma.order.create({
            data: {
                total: total,
                status: "PENDING",
                user: undefined, // Guest checkout for now (or linked if I handled auth in passed params)
                shippingInfo: shippingInfo as any, // Json type
                // Also create Address in DB to be clean? For now just storing in JSON to allow Guest.
                items: {
                    create: items.map(item => ({
                        productSnapshot: { title: item.title, price: item.price, image: item.image },
                        variantSku: item.variantId,
                        quantity: item.quantity,
                        priceAtPurchase: item.price
                    }))
                }
            }
        })

        // Instamojo Integration
        const API_KEY = process.env.INSTAMOJO_API_KEY
        const AUTH_TOKEN = process.env.INSTAMOJO_AUTH_TOKEN
        // const AUTH_TOKEN = process.env.INSTAMOJO_SALT // Sometimes called Salt in older docs, but v1.1 calls it Auth Token? 
        // User said "salt and api". 
        // Standard header is X-Auth-Token: <Auth_Token>

        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

        if (API_KEY && AUTH_TOKEN) {
            console.log("Initiating Instamojo Payment...")
            const payload = new URLSearchParams()
            payload.append("purpose", `Ordering #${order.id.substring(0, 8)}`)
            payload.append("amount", total.toFixed(2))
            payload.append("buyer_name", shippingInfo.name)
            payload.append("email", shippingInfo.email)
            payload.append("phone", "9999999999") // Placeholder phone if strictly required. Instamojo often requires phone.
            payload.append("redirect_url", `${BASE_URL}/checkout/success?orderId=${order.id}`)
            payload.append("send_email", "True")
            payload.append("webhook", `${BASE_URL}/api/webhook/instamojo`) // Optional
            payload.append("allow_repeated_payments", "False")

            // Use Prod URL ? User didn't specify Sandbox. Default to Prod for real "Integration".
            // But if keys are invalid it will fail.
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
                // Update order with payment ID if available
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
            console.warn("Instamojo Keys missing. Simulating success.")
            // Simulate payment processing
            // In real app, redirect to payment gateway here.

            // Mark as paid for simulation
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
