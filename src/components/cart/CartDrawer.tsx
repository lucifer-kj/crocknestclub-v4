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
            <SheetContent className="flex w-full flex-col sm:max-w-md border-l-2 border-black bg-background p-0 sm:p-0">
                <SheetHeader className="p-6 border-b-2 border-black bg-muted/20">
                    <SheetTitle className="text-3xl font-black uppercase tracking-tighter text-left">Your Stash ({items.length})</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-6 py-6">
                    {items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center space-y-4 text-muted-foreground text-center">
                            <p className="text-lg font-medium">Your cart is empty.</p>
                            <Button variant="link" onClick={() => closeCart()} className="text-primary text-xl font-bold uppercase tracking-widest decoration-2 underline-offset-4">Start Shopping</Button>
                        </div>
                    ) : (
                        <ul className="space-y-6">
                            {items.map((item) => (
                                <li key={item.variantId} className="flex gap-4 group">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden border-2 border-black bg-muted">
                                        <img
                                            src={item.image || `https://placehold.co/100x100/000000/FFFFFF/png?text=${encodeURIComponent(item.title)}`}
                                            alt={item.title}
                                            className="h-full w-full object-cover object-center grayscale group-hover:grayscale-0 transition-all"
                                            onError={(e) => {
                                                e.currentTarget.src = `https://placehold.co/100x100/000000/FFFFFF/png?text=${encodeURIComponent(item.title)}`
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div className="flex justify-between text-base font-bold">
                                            <h3 className="uppercase tracking-tight line-clamp-2">{item.title}</h3>
                                            <p className="ml-4 font-mono">${item.price.toFixed(2)}</p>
                                        </div>
                                        <p className="mt-1 text-xs font-mono text-muted-foreground uppercase">{item.color} / {item.size}</p>
                                        <div className="flex items-center justify-between text-sm mt-2">
                                            <div className="flex items-center gap-2 border-2 border-black p-0.5">
                                                <button
                                                    onClick={() => updateQuantity(item.variantId, Math.max(1, item.quantity - 1))}
                                                    className="p-1 hover:bg-black hover:text-white transition-colors disabled:opacity-50"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="w-6 text-center font-mono font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                                    className="p-1 hover:bg-black hover:text-white transition-colors"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeItem(item.variantId)}
                                                className="font-medium text-destructive hover:text-destructive/80 transition-colors uppercase text-xs tracking-wider border-b border-transparent hover:border-destructive"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t-2 border-black p-6 bg-muted/20">
                        <div className="flex justify-between text-lg font-black uppercase tracking-tight mb-4">
                            <p>Subtotal</p>
                            <p className="font-mono">${subtotal.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground mb-6 font-mono">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <div className="grid gap-3">
                            <Button className="w-full text-lg h-14 uppercase font-black tracking-widest rounded-none border-2 border-transparent hover:border-black" size="lg" asChild>
                                <a href="/checkout" onClick={() => closeCart()}>Checkout</a>
                            </Button>
                            <Button variant="outline" className="w-full h-12 rounded-none border-2 border-black hover:bg-black hover:text-white uppercase font-bold tracking-wider" onClick={() => closeCart()}>
                                Continue Shopping
                            </Button>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
