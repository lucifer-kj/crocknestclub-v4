"use server"

import { prisma } from "@/lib/prisma"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function register(formData: FormData) {
    const rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    }

    const validated = registerSchema.safeParse(rawData)

    if (!validated.success) {
        return { error: validated.error.issues[0].message }
    }

    const { name, email, password } = validated.data

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return { error: "User already exists with this email" }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: "USER"
            }
        })

        // No redirect here, allowing client to handle or redirect
        // But the previous implementation might have redirected. 
        // Let's redirect to login for simplicity

    } catch (error) {
        console.error("Registration error:", error)
        return { error: "Something went wrong. Please try again." }
    }

    redirect("/login")
}
