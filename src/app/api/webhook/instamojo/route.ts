import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const paymentId = formData.get("payment_id") as string
        const paymentRequestId = formData.get("payment_request_id") as string
        const status = formData.get("status") as string

        // Optional: Verify MAC signature here if salt provided in ENV
        // const mac = formData.get("mac")

        console.log(`Webhook Received: ${paymentRequestId}, Status: ${status}`)

        if (status === "Credit") {
            const order = await prisma.order.findFirst({
                where: { paymentId: paymentRequestId }
            })

            if (order) {
                await prisma.order.update({
                    where: { id: order.id },
                    data: {
                        status: "PAID",
                        paymentInfo: Object.fromEntries(formData) as any
                    }
                })
                console.log(`Order ${order.id} marked as PAID.`)
            } else {
                console.warn(`Order not found for Payment Request ID: ${paymentRequestId}`)
            }
        } else {
            console.log(`Payment Status: ${status}. Order not updated.`)
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Webhook Error:", error)
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
    }
}
