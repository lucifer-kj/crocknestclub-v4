"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { register } from "./actions"
import Link from "next/link"
import { useState } from "react"

export default function RegisterPage() {
    const [error, setError] = useState<string | null>(null)

    async function handleRegister(formData: FormData) {
        const result = await register(formData)
        if (result?.error) {
            setError(result.error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-black uppercase text-center">Join The Club</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={handleRegister} className="space-y-4">
                        {error && <div className="text-red-500 text-sm text-center font-medium">{error}</div>}
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" required placeholder="Your Name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" required placeholder="you@example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        <Button className="w-full font-bold uppercase" type="submit">Sign Up</Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center text-sm text-muted-foreground">
                    Already a member? <Link href="/login" className="ml-1 text-primary hover:underline">Log in</Link>
                </CardFooter>
            </Card>
        </div>
    )
}
