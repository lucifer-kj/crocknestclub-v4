import Link from 'next/link';

export default function CartPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-background-dark">
            <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 md:px-8 py-12">
                <h1 className="text-4xl font-black mb-8 text-black dark:text-white">YOUR CART (2)</h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1 space-y-6">
                        <div className="flex gap-6 p-4 rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                            <div className="h-32 w-32 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2Od78RBC79BkULEeg0fgJ1whkCp6ydfg7o6Qrsftl3VFYg60gh5akgfqda2KZyGI6AhzJ5Kcc5RvpCy3R_VLzDaXOfrA-BHY0p4UI5bcwNWXp_ohK4jIsFmtTfhEAEyISiamnxrp9bRpoSITkWc6he_aE4xwmpwj-Yz3ULhtuX6zZafaScamJ966maKztKG032W2tnFG1pcHj68xS_SWjYQdo_VpBinhW7YjkrzlXA3s3sin4PFdK1qDYlf4z8-lCYVjkKMdtw7w" className="h-full w-full object-cover" />
                            </div>
                            <div className="flex flex-1 flex-col justify-between">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg text-black dark:text-white">Neon Cyber Tee</h3>
                                        <p className="text-gray-500">Size: M / Color: Black</p>
                                    </div>
                                    <p className="font-bold text-lg text-black dark:text-white">₹3500.00</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
                                        <button className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-white/10">-</button>
                                        <span className="px-3 font-medium text-black dark:text-white">1</span>
                                        <button className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-white/10">+</button>
                                    </div>
                                    <button className="text-sm font-bold text-red-500 hover:underline">Remove</button>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-6 p-4 rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                            <div className="h-32 w-32 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyTTQiHjjGRd3WKxfAhfQGptLKtDfyJLvkwNl8AVNpXm3eVGwK35Y5lfAiJQZdvmWStJj9i25zPBR7WFJWw1_s7hqj6Ub7hLqc-ia7k2Vl9mRbCznQiG2B-Lu8j3wwTwUjYvd0vMc7ltSHeOcqxAJPeZ4BBfLplQuMbMblTpXvM7rXu0UtUSZlWJCJbJRXPatsWXeLVNYme1lrUHqBf-8kblCiHmat5vnbV6hqQQEzqZvr9mNgqb0GrsMz6ukpFWUB4jJmDRBluZ0" className="h-full w-full object-cover" />
                            </div>
                            <div className="flex flex-1 flex-col justify-between">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg text-black dark:text-white">Tech Utility Cargo</h3>
                                        <p className="text-gray-500">Size: 32 / Color: Charcoal</p>
                                    </div>
                                    <p className="font-bold text-lg text-black dark:text-white">₹6000.00</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
                                        <button className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-white/10">-</button>
                                        <span className="px-3 font-medium text-black dark:text-white">1</span>
                                        <button className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-white/10">+</button>
                                    </div>
                                    <button className="text-sm font-bold text-red-500 hover:underline">Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-96 p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-primary/20 h-fit">
                        <h3 className="font-bold text-xl mb-6 text-black dark:text-white">Summary</h3>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-black dark:text-white">
                                <span>Subtotal</span>
                                <span className="font-bold">₹9500.00</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Shipping</span>
                                <span>Calculated at checkout</span>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 dark:border-white/10 pt-4 mb-8">
                            <div className="flex justify-between text-lg font-black text-black dark:text-white">
                                <span>Total</span>
                                <span>₹9500.00</span>
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
