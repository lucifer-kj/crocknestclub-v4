"use client"

import { useCartStore } from "@/store/cart"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { createOrder } from "./actions"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
    const { items, clearCart } = useCartStore()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shipping: number = 0 // Free for now
    const total = subtotal + shipping

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const shippingInfo = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            address: formData.get("address") as string,
            city: formData.get("city") as string,
            zip: formData.get("zip") as string,
            country: formData.get("country") as string,
        }

        const result = await createOrder(items, total, shippingInfo)

        if (result.success && result.redirectUrl) {
            router.push(result.redirectUrl)
        } else if (result.success && result.orderId) {
            // Fallback for simulation
            clearCart()
            router.push(`/checkout/success?orderId=${result.orderId}`)
        } else {
            alert(`Checkout failed: ${result.error || "Unknown error"}`)
        }
        setIsLoading(false)
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-black uppercase tracking-tighter">Your Stash is Empty</h1>
                    <Button onClick={() => router.push("/shop")} size="lg" className="rounded-none border-2 border-black font-bold uppercase tracking-widest">Go to Shop</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-10 px-4 md:px-8 max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 text-center md:text-left border-b-2 border-black pb-8">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Shipping Form */}
                <div>
                    <Card className="rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <CardHeader className="border-b-2 border-black bg-muted/20">
                            <CardTitle className="uppercase font-black tracking-wide text-xl">Shipping Details</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="uppercase font-bold text-xs tracking-widest">Full Name</Label>
                                    <Input id="name" name="name" required placeholder="John Doe" className="rounded-none border-2 border-black h-12 bg-transparent focus-visible:ring-0 focus-visible:border-primary" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="uppercase font-bold text-xs tracking-widest">Email</Label>
                                    <Input id="email" name="email" type="email" required placeholder="john@example.com" className="rounded-none border-2 border-black h-12 bg-transparent focus-visible:ring-0 focus-visible:border-primary" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address" className="uppercase font-bold text-xs tracking-widest">Address</Label>
                                    <Input id="address" name="address" required placeholder="123 Street Name" className="rounded-none border-2 border-black h-12 bg-transparent focus-visible:ring-0 focus-visible:border-primary" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="city" className="uppercase font-bold text-xs tracking-widest">City</Label>
                                        <Input id="city" name="city" required placeholder="New York" className="rounded-none border-2 border-black h-12 bg-transparent focus-visible:ring-0 focus-visible:border-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="zip" className="uppercase font-bold text-xs tracking-widest">ZIP Code</Label>
                                        <Input id="zip" name="zip" required placeholder="10001" className="rounded-none border-2 border-black h-12 bg-transparent focus-visible:ring-0 focus-visible:border-primary" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="country" className="uppercase font-bold text-xs tracking-widest">Country</Label>
                                    <Input id="country" name="country" required placeholder="United States" className="rounded-none border-2 border-black h-12 bg-transparent focus-visible:ring-0 focus-visible:border-primary" />
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary */}
                <div>
                    <Card className="sticky top-24 rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-card">
                        <CardHeader className="border-b-2 border-black bg-muted/20">
                            <CardTitle className="uppercase font-black tracking-wide text-xl">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 p-6">
                            <ul className="divide-y divide-black/10 max-h-[400px] overflow-y-auto">
                                {items.map((item) => (
                                    <li key={item.variantId} className="flex justify-between py-4">
                                        <div className="flex gap-4">
                                            <div className="h-16 w-16 bg-muted border-2 border-black overflow-hidden flex-shrink-0">
                                                <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm uppercase tracking-tight line-clamp-2">{item.title}</p>
                                                <p className="text-xs font-mono mt-1">{item.size} x {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-mono font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                    </li>
                                ))}
                            </ul>

                            <div className="border-t-2 border-black pt-4 space-y-2">
                                <div className="flex justify-between text-sm font-medium uppercase tracking-wide">
                                    <span>Subtotal</span>
                                    <span className="font-mono">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium uppercase tracking-wide">
                                    <span>Shipping</span>
                                    <span className="font-mono">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between font-black text-xl pt-4 border-t-2 border-black mt-4 uppercase">
                                    <span>Total</span>
                                    <span className="font-mono">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="p-6 pt-0">
                            <Button
                                className="w-full h-14 text-xl font-black uppercase tracking-widest rounded-none border-2 border-transparent hover:border-black hover:bg-white hover:text-black transition-all shadow-none hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                type="submit"
                                size="lg"
                                form="checkout-form"
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : "Pay with Instamojo"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            <div className="mt-12 flex justify-center opacity-50 grayscale hover:grayscale-0 transition-all">
                {/* Trust Badges / Footer Info */}
                <p className="text-xs font-mono uppercase">Secured by Instamojo</p>
            </div>
        </div>
    )
}
