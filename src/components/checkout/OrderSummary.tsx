export function OrderSummary() {
    return (
        <div className="w-full lg:w-[480px] bg-gray-50 dark:bg-white/5 px-4 py-8 lg:px-10 lg:py-12 lg:min-h-screen border-l border-primary/20">
            <div className="lg:sticky lg:top-32 space-y-8">
                <h2 className="text-xl font-bold text-text-main dark:text-white">Order Summary</h2>
                <div className="space-y-6">
                    <div className="flex gap-4 group">
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20">
                            <img
                                alt="Neon Cyber Tee"
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2Od78RBC79BkULEeg0fgJ1whkCp6ydfg7o6Qrsftl3VFYg60gh5akgfqda2KZyGI6AhzJ5Kcc5RvpCy3R_VLzDaXOfrA-BHY0p4UI5bcwNWXp_ohK4jIsFmtTfhEAEyISiamnxrp9bRpoSITkWc6he_aE4xwmpwj-Yz3ULhtuX6zZafaScamJ966maKztKG032W2tnFG1pcHj68xS_SWjYQdo_VpBinhW7YjkrzlXA3s3sin4PFdK1qDYlf4z8-lCYVjkKMdtw7w"
                            />
                            <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-md border border-white dark:border-gray-900">1</div>
                        </div>
                        <div className="flex flex-1 flex-col justify-between py-1">
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-text-main dark:text-white">Neon Cyber Tee</h3>
                                    <p className="font-bold text-text-main dark:text-white">$35.00</p>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Size: M / Color: Black</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="text-xs font-medium text-gray-500 hover:text-primary underline">Remove</button>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 group">
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20">
                            <img
                                alt="Tech Utility Cargo"
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyTTQiHjjGRd3WKxfAhfQGptLKtDfyJLvkwNl8AVNpXm3eVGwK35Y5lfAiJQZdvmWStJj9i25zPBR7WFJWw1_s7hqj6Ub7hLqc-ia7k2Vl9mRbCznQiG2B-Lu8j3wwTwUjYvd0vMc7ltSHeOcqxAJPeZ4BBfLplQuMbMblTpXvM7rXu0UtUSZlWJCJbJRXPatsWXeLVNYme1lrUHqBf-8kblCiHmat5vnbV6hqQQEzqZvr9mNgqb0GrsMz6ukpFWUB4jJmDRBluZ0"
                            />
                            <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-md border border-white dark:border-gray-900">1</div>
                        </div>
                        <div className="flex flex-1 flex-col justify-between py-1">
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-text-main dark:text-white">Tech Utility Cargo</h3>
                                    <p className="font-bold text-text-main dark:text-white">$60.00</p>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Size: 32 / Color: Charcoal</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="text-xs font-medium text-gray-500 hover:text-primary underline">Remove</button>
                            </div>
                        </div>
                    </div>
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
                        <span className="font-medium">$95.00</span>
                    </div>
                    <div className="flex justify-between text-sm text-text-main dark:text-gray-300">
                        <span>Shipping</span>
                        <span className="text-xs text-gray-500">(Calculated at next step)</span>
                    </div>
                    <div className="flex justify-between text-sm text-text-main dark:text-gray-300">
                        <span>Taxes</span>
                        <span className="font-medium">$0.00</span>
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 dark:border-white/10 pt-6">
                    <span className="text-xl font-bold text-text-main dark:text-white">Total</span>
                    <div className="flex items-end gap-2">
                        <span className="text-sm text-gray-500 mb-1">USD</span>
                        <span className="text-2xl font-bold text-primary">$95.00</span>
                    </div>
                </div>

                <button className="hidden lg:flex w-full rounded-xl bg-black dark:bg-white text-white dark:text-black py-4 text-lg font-bold shadow-lg shadow-black/20 border border-primary transition hover:bg-gray-900 hover:shadow-black/40 items-center justify-center gap-2 hover:-translate-y-1 transform duration-200">
                    <span>Pay $95.00</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>

                <p className="text-center text-xs text-gray-500">
                    By continuing, you accept our <a className="underline hover:text-primary" href="#">Terms</a> and <a className="underline hover:text-primary" href="#">Privacy Policy</a>.
                </p>
            </div>
        </div>
    );
}
