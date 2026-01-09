import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    // Dates for revenue growth
    const now = new Date()
    const firstDayCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

    const [currentRevenue, lastRevenue, activeOrders, lowStockItems, totalProducts, returnsCount, totalOrders] = await Promise.all([
        prisma.order.aggregate({
            _sum: { total: true },
            where: { status: "PAID", createdAt: { gte: firstDayCurrentMonth } }
        }),
        prisma.order.aggregate({
            _sum: { total: true },
            where: { status: "PAID", createdAt: { gte: firstDayLastMonth, lte: lastDayLastMonth } }
        }),
        prisma.order.count({
            where: { status: { notIn: ["CANCELLED", "DELIVERED", "SHIPPED"] } }
        }),
        prisma.product.count({
            where: { stock: { lte: 5 } }
        }),
        prisma.product.count(),
        prisma.order.count({
            where: { status: "CANCELLED" }
        }),
        prisma.order.count()
    ])

    const currentRev = Number(currentRevenue._sum.total || 0)
    const lastRev = Number(lastRevenue._sum.total || 0)
    const revGrowth = lastRev === 0 ? 100 : ((currentRev - lastRev) / lastRev) * 100

    return NextResponse.json({
        totalRevenue: currentRev,
        revGrowth,
        activeOrders,
        lowStockItems,
        totalProducts,
        returnsCount,
        totalOrders
    })
}
