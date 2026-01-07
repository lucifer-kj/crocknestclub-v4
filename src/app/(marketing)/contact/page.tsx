"use client"

import { useFormState, useFormStatus } from "react-dom"
import { submitContact } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button
            type="submit"
            disabled={pending}
            className="w-full rounded-none border-2 border-black"
        >
            {pending ? "Sending..." : "Send Message"}
        </Button>
    )
}

export default function ContactPage() {
    // using a simple client-side wrapper instead of useFormState type dance for now to keep it clean
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

    async function handleSubmit(formData: FormData) {
        const result = await submitContact(formData)
        if (result.success) {
            setStatus("success")
        } else {
            setStatus("error")
        }
    }

    if (status === "success") {
        return (
            <div className="max-w-md mx-auto py-20 px-4 text-center">
                <h1 className="text-3xl font-black uppercase mb-4">Message Sent</h1>
                <p className="mb-8">Thanks for reaching out. We'll get back to you shortly.</p>
                <Button onClick={() => setStatus("idle")} variant="outline" className="rounded-none border-2 border-black">
                    Send Another
                </Button>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto py-16 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Contact Us</h1>
                <p className="text-muted-foreground">Got a question? Use the form below.</p>
            </div>

            <form action={handleSubmit} className="space-y-6 border-2 border-black p-8 bg-card shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="space-y-2">
                    <Label htmlFor="name" className="uppercase font-bold">Name</Label>
                    <Input id="name" name="name" required placeholder="Your Name" className="rounded-none border-2 border-black" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="uppercase font-bold">Email</Label>
                    <Input id="email" name="email" type="email" required placeholder="your@email.com" className="rounded-none border-2 border-black" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message" className="uppercase font-bold">Message</Label>
                    <Textarea id="message" name="message" required placeholder="How can we help?" className="rounded-none border-2 border-black min-h-[150px]" />
                </div>

                <SubmitButton />

                {status === "error" && (
                    <p className="text-red-500 font-bold text-center">Something went wrong. Please try again.</p>
                )}
            </form>
        </div>
    )
}
