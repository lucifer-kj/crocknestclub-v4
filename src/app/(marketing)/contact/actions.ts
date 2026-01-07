"use server"

import { z } from "zod"

const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    message: z.string().min(10, "Message must be at least 10 characters")
})

export async function submitContact(formData: FormData) {
    const rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message")
    }

    const validatedFields = contactSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return { success: false, errors: validatedFields.error.flatten().fieldErrors }
    }

    // Simulate sending email
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log("Contact submission:", validatedFields.data)

    return { success: true }
}
