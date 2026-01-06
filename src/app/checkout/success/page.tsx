"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { Suspense } from "react" // Needed for useSearchParams in Nextjs 14+ client components?

// Inner component to wrap with Suspense
function SuccessContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const orderId = searchParams.get("orderId")

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
            <CheckCircle2 className="h-20 w-20 text-green-500 mb-6" />
            <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
                Your order {orderId ? `#${orderId.slice(0, 8)}` : ""} has been placed successfully.
                Welcome to the club.
            </p>
            <div className="flex gap-4">
                <Button size="lg" onClick={() => router.push("/shop")}>Continue Shopping</Button>
                <Button variant="outline" size="lg" onClick={() => router.push("/")}>Back Home</Button>
            </div>
        </div>
    )
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessContent />
        </Suspense>
    )
}
