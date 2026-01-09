"use server"

import { prisma } from "@/lib/prisma"
import { ReturnStatus } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export async function updateReturnStatus(requestId: string, status: ReturnStatus) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    await prisma.returnRequest.update({
        where: { id: requestId },
        data: { status }
    })

    revalidatePath("/admin/returns")
}
