"use client";

import { useCart } from "@/store/cart-context";

export function OrderSummary() {
    const { items, cartTotal, removeFromCart } = useCart();
    const shipping = 0; // Calculated in future
    const total = cartTotal + shipping;

    if (items.length === 0) {
        return (
            <div className="w-full lg:w-[480px] bg-gray-50 dark:bg-white/5 px-4 py-8 lg:px-10 lg:py-12 lg:min-h-screen border-l border-primary/20">
                <p className="text-gray-500">Your cart is empty.</p>
            </div>
        )
    }

    return (
        <div className="w-full lg:w-[480px] bg-gray-50 dark:bg-white/5 px-4 py-8 lg:px-10 lg:py-12 lg:min-h-screen border-l border-primary/20">
            <div className="lg:sticky lg:top-32 space-y-8">
                <h2 className="text-xl font-bold text-text-main dark:text-white">Order Summary</h2>
                <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2">
                    {items.map((item) => (
                        <div key={item.variantId} className="flex gap-4 group">
                            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20">
                                <img
                                    alt={item.title}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                    src={item.image}
                                />
                                <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-md border border-white dark:border-gray-900">
                                    {item.quantity}
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col justify-between py-1">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-text-main dark:text-white">{item.title}</h3>
                                        <p className="font-bold text-text-main dark:text-white">₹{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">Size: {item.size} / Color: {item.color}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => removeFromCart(item.variantId)}
                                        className="text-xs font-medium text-gray-500 hover:text-primary underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-white/10">
                    <input className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 px-4 py-3 text-sm outline-none focus:ring-2 ring-primary/20 transition focus:border-primary focus:ring-primary text-black dark:text-white placeholder:text-gray-400" placeholder="Gift card or discount code" type="text" />
                    <button className="rounded-lg bg-primary/10 border border-primary/20 px-6 py-2.5 text-sm font-bold text-primary transition hover:bg-primary hover:text-white">
                        Apply
                    </button>
                </div>

                <div className="space-y-3 pt-6 pb-2">
                    <div className="flex justify-between text-sm text-text-main dark:text-gray-300">
                        <span>Subtotal</span>
                        <span className="font-medium">₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-text-main dark:text-gray-300">
                        <span>Shipping</span>
                        <span className="text-xs text-gray-500">(Calculated at next step)</span>
                    </div>
                    <div className="flex justify-between text-sm text-text-main dark:text-gray-300">
                        <span>Taxes</span>
                        <span className="font-medium">₹0.00</span>
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 dark:border-white/10 pt-6">
                    <span className="text-xl font-bold text-text-main dark:text-white">Total</span>
                    <div className="flex items-end gap-2">
                        <span className="text-sm text-gray-500 mb-1">INR</span>
                        <span className="text-2xl font-bold text-primary">₹{total.toFixed(2)}</span>
                    </div>
                </div>

                {/* Note: Payment Button moved to CheckoutForm to handle submission */}
            </div>
        </div>
    );
}
