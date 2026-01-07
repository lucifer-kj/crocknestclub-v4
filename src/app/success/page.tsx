import Link from 'next/link';
import { CheckoutHeader } from "@/components/checkout/CheckoutHeader"; // Reusing simplified header for focus
import { StitchFooter } from "@/components/layout/StitchFooter";

export default function OrderConfirmationPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-background-dark">
            <CheckoutHeader />

            <main className="flex-1 px-4 py-12 md:px-6 lg:px-8 bg-white dark:bg-background-dark">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-16 flex flex-col items-center text-center">
                        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary via-blue-600 to-black shadow-xl shadow-primary/20 ring-4 ring-white dark:ring-white/10 text-white">
                            <span className="material-symbols-outlined text-5xl">check</span>
                        </div>
                        <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight md:text-6xl uppercase text-text-main dark:text-white">
                            Thanks for joining<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">the club!</span>
                        </h1>
                        <p className="max-w-md text-lg text-gray-600 dark:text-gray-300 font-medium">
                            Your order <span className="text-primary font-bold">#882910</span> is locked in. We've sent a receipt to your email.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 p-8 shadow-sm">
                                <h3 className="mb-6 text-lg font-bold uppercase tracking-wide text-text-main dark:text-white border-b border-gray-100 dark:border-white/10 pb-4">Order Details</h3>
                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold uppercase text-primary tracking-wider">Order Number</p>
                                        <p className="text-base font-semibold text-text-main dark:text-white">#882910</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold uppercase text-primary tracking-wider">Estimated Delivery</p>
                                        <p className="text-base font-semibold text-text-main dark:text-white">Oct 28 - Oct 30, 2026</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold uppercase text-primary tracking-wider">Shipping Address</p>
                                        <p className="text-base text-gray-600 dark:text-gray-300">123 Electric Ave<br />New York, NY 10012</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold uppercase text-primary tracking-wider">Payment Method</p>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-gray-400 text-sm">credit_card</span>
                                            <p className="text-base text-gray-600 dark:text-gray-300">Visa ending in 4242</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 shadow-sm">
                                <div className="px-8 py-5 border-b border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                                    <h3 className="text-lg font-bold uppercase tracking-wide text-text-main dark:text-white">Items Ordered</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[500px]">
                                        <thead>
                                            <tr className="border-b border-gray-100 dark:border-white/10">
                                                <th className="px-8 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 w-[50%]">Product</th>
                                                <th className="px-8 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500">Size</th>
                                                <th className="px-8 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500">Qty</th>
                                                <th className="px-8 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                                            <tr>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-white/10">
                                                            <img alt="Product" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2Od78RBC79BkULEeg0fgJ1whkCp6ydfg7o6Qrsftl3VFYg60gh5akgfqda2KZyGI6AhzJ5Kcc5RvpCy3R_VLzDaXOfrA-BHY0p4UI5bcwNWXp_ohK4jIsFmtTfhEAEyISiamnxrp9bRpoSITkWc6he_aE4xwmpwj-Yz3ULhtuX6zZafaScamJ966maKztKG032W2tnFG1pcHj68xS_SWjYQdo_VpBinhW7YjkrzlXA3s3sin4PFdK1qDYlf4z8-lCYVjkKMdtw7w" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-text-main dark:text-white text-lg">Neon Cyber Tee</p>
                                                            <p className="text-sm text-gray-500">Black / Cotton</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-center font-medium text-gray-700 dark:text-gray-300">L</td>
                                                <td className="px-8 py-6 text-center font-medium text-gray-700 dark:text-gray-300">1</td>
                                                <td className="px-8 py-6 text-right font-bold text-text-main dark:text-white">$35.00</td>
                                            </tr>
                                            <tr>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-white/10">
                                                            <img alt="Product" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyTTQiHjjGRd3WKxfAhfQGptLKtDfyJLvkwNl8AVNpXm3eVGwK35Y5lfAiJQZdvmWStJj9i25zPBR7WFJWw1_s7hqj6Ub7hLqc-ia7k2Vl9mRbCznQiG2B-Lu8j3wwTwUjYvd0vMc7ltSHeOcqxAJPeZ4BBfLplQuMbMblTpXvM7rXu0UtUSZlWJCJbJRXPatsWXeLVNYme1lrUHqBf-8kblCiHmat5vnbV6hqQQEzqZvr9mNgqb0GrsMz6ukpFWUB4jJmDRBluZ0" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-text-main dark:text-white text-lg">Tech Cargo Pants</p>
                                                            <p className="text-sm text-gray-500">Charcoal</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-center font-medium text-gray-700 dark:text-gray-300">32</td>
                                                <td className="px-8 py-6 text-center font-medium text-gray-700 dark:text-gray-300">1</td>
                                                <td className="px-8 py-6 text-right font-bold text-text-main dark:text-white">$55.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="rounded-xl border border-primary/20 bg-white dark:bg-black/20 p-8 shadow-xl shadow-primary/5">
                                <h3 className="mb-6 text-lg font-bold uppercase tracking-wide text-text-main dark:text-white">Summary</h3>
                                <div className="space-y-4 border-b border-dashed border-gray-200 dark:border-white/10 pb-6">
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-500">Subtotal</p>
                                        <p className="font-semibold text-text-main dark:text-white">$90.00</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-500">Shipping</p>
                                        <p className="font-semibold text-primary">Free</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-500">Tax</p>
                                        <p className="font-semibold text-text-main dark:text-white">$0.00</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-6">
                                    <p className="text-xl font-bold uppercase text-text-main dark:text-white">Total</p>
                                    <p className="text-3xl font-black text-primary">$90.00</p>
                                </div>
                                <Link href="/shop" className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary py-4 px-6 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30">
                                    Continue Shopping
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </Link>
                                <Link href="/tracking" className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-white/20 bg-transparent py-3 px-6 text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 transition-colors hover:border-primary hover:text-primary">
                                    Track Order
                                </Link>
                            </div>
                            <div className="rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-6 text-center">
                                <p className="mb-2 font-bold text-text-main dark:text-white">Questions?</p>
                                <p className="mb-4 text-sm text-gray-500">We're here to help you with your order.</p>
                                <a className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline hover:text-primary/80" href="#">
                                    Contact Support <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-24 border-t border-gray-200 dark:border-white/10 pt-16">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black uppercase tracking-tight text-text-main dark:text-white md:text-3xl">You Might Also Like</h3>
                            <Link href="/shop" className="hidden md:inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">View All Collection <span className="material-symbols-outlined text-sm">arrow_right_alt</span></Link>
                        </div>
                        {/* Reusing Product Grid logic/Mockup here or simplified */}
                        <p className="text-gray-500">More trending products from the shop...</p>
                    </div>
                </div>
            </main>

            <StitchFooter />
        </div>
    );
}
