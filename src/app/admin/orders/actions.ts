"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { OrderStatus } from "@prisma/client"
import { auth } from "@/auth"

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    await prisma.order.update({
        where: { id: orderId },
        data: { status }
    })
    revalidatePath(`/admin/orders/${orderId}`)
    revalidatePath("/admin/orders")
}

// Placeholder for refund logic
export async function processRefund(orderId: string) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    // In a real app, this would call Instamojo refund API
    console.log(`Processing refund for order ${orderId}`)

    await prisma.order.update({
        where: { id: orderId },
        data: { status: "CANCELLED" }
    })

    revalidatePath(`/admin/orders/${orderId}`)
    revalidatePath("/admin/orders")
}
