"use client"

import Link from 'next/link';
import { useCart } from '@/store/cart-context';

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

    const shipping = 0; // Calculated at checkout
    const total = cartTotal + shipping;

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-background-dark px-4">
                <div className="text-center space-y-4">
                    <span className="material-symbols-outlined text-6xl text-slate-300 transform rotate-12">shopping_bag</span>
                    <h1 className="text-2xl font-bold text-black dark:text-white">Your cart is empty</h1>
                    <p className="text-slate-500">Looks like you haven't added anything yet.</p>
                    <Link href="/shop" className="inline-block px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors">
                        Start Shopping
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-background-dark">
            <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 md:px-8 py-12">
                <h1 className="text-4xl font-black mb-8 text-black dark:text-white">YOUR CART ({cartCount})</h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1 space-y-6">
                        {items.map((item) => (
                            <div key={item.variantId} className="flex gap-6 p-4 rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                                <div className="h-32 w-32 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex flex-1 flex-col justify-between">
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="font-bold text-lg text-black dark:text-white">{item.title}</h3>
                                            <p className="text-gray-500">Size: {item.size} / Color: {item.color}</p>
                                        </div>
                                        <p className="font-bold text-lg text-black dark:text-white">₹{item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-surface-dark">
                                            <button
                                                onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                                className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                                                aria-label="Decrease quantity"
                                            >
                                                -
                                            </button>
                                            <span className="px-3 font-medium text-black dark:text-white">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                                className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.variantId)}
                                            className="text-sm font-bold text-red-500 hover:underline flex items-center gap-1"
                                        >
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="w-full lg:w-96 p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-primary/20 h-fit sticky top-24">
                        <h3 className="font-bold text-xl mb-6 text-black dark:text-white">Summary</h3>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-black dark:text-white">
                                <span>Subtotal</span>
                                <span className="font-bold">₹{cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Shipping</span>
                                <span>Calculated at checkout</span>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 dark:border-white/10 pt-4 mb-8">
                            <div className="flex justify-between text-lg font-black text-black dark:text-white">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                        <Link href="/checkout" className="w-full block text-center bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-dark transition-colors shadow-lg hover:shadow-primary/30">
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
