import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const ids = searchParams.get("ids")?.split(",") || []

    if (ids.length === 0) {
        return NextResponse.json({})
    }

    const products = await prisma.product.findMany({
        where: { id: { in: ids } },
        select: { id: true, stock: true }
    })

    const stockMap = products.reduce((acc, p) => {
        acc[p.id] = p.stock
        return acc
    }, {} as Record<string, number>)

    return NextResponse.json(stockMap)
}
