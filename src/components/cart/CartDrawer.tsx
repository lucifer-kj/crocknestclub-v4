"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCartStore } from "@/store/cart"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, X } from "lucide-react"

export function CartDrawer() {
    const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore()

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
            <SheetContent className="flex w-full flex-col sm:max-w-md">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-black uppercase tracking-tight text-left">Your Stash ({items.length})</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4">
                    {items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center space-y-2 text-muted-foreground">
                            <p>Your cart is empty.</p>
                            <Button variant="link" onClick={() => closeCart()} className="text-primary">Start Shopping</Button>
                        </div>
                    ) : (
                        <ul className="space-y-6">
                            {items.map((item) => (
                                <li key={item.variantId} className="flex gap-4">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                                        <img
                                            src={item.image || "/placeholder.jpg"}
                                            alt={item.title}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div className="flex justify-between text-base font-medium">
                                            <h3>{item.title}</h3>
                                            <p className="ml-4">${item.price.toFixed(2)}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-muted-foreground uppercase">{item.color} / {item.size}</p>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 border rounded-md p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.variantId, Math.max(1, item.quantity - 1))}
                                                    className="p-1 hover:bg-muted rounded"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                                    className="p-1 hover:bg-muted rounded"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeItem(item.variantId)}
                                                className="font-medium text-destructive hover:text-destructive/80 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t pt-4">
                        <div className="flex justify-between text-base font-medium mb-4">
                            <p>Subtotal</p>
                            <p>${subtotal.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground mb-4">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <div className="grid gap-2">
                            <Button className="w-full text-lg h-12 uppercase font-bold" size="lg">Checkout</Button>
                            <Button variant="outline" className="w-full" onClick={() => closeCart()}>Continue Shopping</Button>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
