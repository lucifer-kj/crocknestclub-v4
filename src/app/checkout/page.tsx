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

        if (result.success) {
            clearCart()
            router.push(`/checkout/success?orderId=${result.orderId}`)
        } else {
            alert("Checkout failed. Please try again.")
        }
        setIsLoading(false)
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Your Stash is Empty</h1>
                    <Button onClick={() => router.push("/shop")}>Go to Shop</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-10 px-4 md:px-8 max-w-6xl mx-auto">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-8 text-center md:text-left">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Shipping Form */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" name="name" required placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" required placeholder="john@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" name="address" required placeholder="123 Street Name" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" name="city" required placeholder="New York" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="zip">ZIP Code</Label>
                                        <Input id="zip" name="zip" required placeholder="10001" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Input id="country" name="country" required placeholder="United States" />
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary */}
                <div>
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="divide-y max-h-[300px] overflow-y-auto">
                                {items.map((item) => (
                                    <li key={item.variantId} className="flex justify-between py-3">
                                        <div className="flex gap-3">
                                            <div className="h-12 w-12 bg-muted rounded overflow-hidden">
                                                <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{item.title}</p>
                                                <p className="text-xs text-muted-foreground">{item.size} x {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                                    </li>
                                ))}
                            </ul>

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full h-12 text-lg font-bold uppercase"
                                type="submit"
                                form="checkout-form"
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : "Place Order"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
