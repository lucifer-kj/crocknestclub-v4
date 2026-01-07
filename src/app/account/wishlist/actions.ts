"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function toggleWishlist(productId: string) {
    const session = await auth()
    if (!session?.user?.email) {
        return { success: false, error: "Unauthorized" }
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { wishlist: true }
    })

    if (!user) return { success: false, error: "User not found" }

    // Ensure wishlist exists
    let wishlist = user.wishlist
    if (!wishlist) {
        wishlist = await prisma.wishlist.create({
            data: { userId: user.id }
        })
    }

    const existingItem = await prisma.wishlistItem.findFirst({
        where: {
            wishlistId: wishlist.id,
            productId
        }
    })

    if (existingItem) {
        // Remove
        await prisma.wishlistItem.delete({
            where: { id: existingItem.id }
        })
        revalidatePath("/account/wishlist")
        return { success: true, action: "removed" }
    } else {
        // Add
        await prisma.wishlistItem.create({
            data: {
                wishlistId: wishlist.id,
                productId
            }
        })
        revalidatePath("/account/wishlist")
        return { success: true, action: "added" }
    }
}
