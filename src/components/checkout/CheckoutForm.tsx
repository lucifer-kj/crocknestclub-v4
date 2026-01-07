export function CheckoutForm() {
    return (
        <div className="flex-1 px-4 py-8 lg:px-10 lg:py-12 lg:border-r border-primary/20">
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                    <h1 className="text-3xl font-bold tracking-tight text-text-main dark:text-white">Checkout</h1>
                    <div className="flex items-center gap-2 text-primary font-medium bg-primary/5 border border-primary/20 px-3 py-1 rounded-lg">
                        <span className="material-symbols-outlined text-sm">timer</span>
                        <span className="text-sm">Cart reserved for <span className="font-bold">09:42</span></span>
                    </div>
                </div>
                <div className="rounded-full bg-gray-200 dark:bg-primary/20 h-1.5 w-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary w-[85%]"></div>
                </div>
            </div>

            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-text-main dark:text-white">Contact Information</h2>
                        <button className="text-sm font-semibold text-primary hover:text-primary-dark" type="button">
                            Log in
                        </button>
                    </div>
                    <div className="grid gap-4">
                        <label className="flex flex-col w-full">
                            <span className="text-sm font-medium text-text-main dark:text-gray-300 pb-1.5">Email address</span>
                            <input className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 px-4 py-3 text-base outline-none focus:ring-2 ring-primary/20 transition focus:border-primary focus:ring-primary text-black dark:text-white placeholder:text-gray-400" placeholder="you@example.com" type="email" />
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary bg-white dark:bg-black/20 dark:border-gray-700" type="checkbox" defaultChecked />
                            <span className="text-sm text-text-main dark:text-gray-300 group-hover:text-primary transition-colors">Email me with news and offers</span>
                        </label>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-text-main dark:text-white mb-4">Shipping Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col">
                            <span className="text-sm font-medium text-text-main dark:text-gray-300 pb-1.5">First name</span>
                            <input className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 px-4 py-3 text-base outline-none focus:ring-2 ring-primary/20 transition focus:border-primary focus:ring-primary text-black dark:text-white placeholder:text-gray-400" placeholder="First name" type="text" />
                        </label>
                        <label className="flex flex-col">
                            <span className="text-sm font-medium text-text-main dark:text-gray-300 pb-1.5">Last name</span>
                            <input className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 px-4 py-3 text-base outline-none focus:ring-2 ring-primary/20 transition focus:border-primary focus:ring-primary text-black dark:text-white placeholder:text-gray-400" placeholder="Last name" type="text" />
                        </label>
                        <label className="flex flex-col md:col-span-2">
                            <span className="text-sm font-medium text-text-main dark:text-gray-300 pb-1.5">Address</span>
                            <input className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 px-4 py-3 text-base outline-none focus:ring-2 ring-primary/20 transition focus:border-primary focus:ring-primary text-black dark:text-white placeholder:text-gray-400" placeholder="Street address, apartment, suite" type="text" />
                        </label>
                        <label className="flex flex-col">
                            <span className="text-sm font-medium text-text-main dark:text-gray-300 pb-1.5">City</span>
                            <input className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 px-4 py-3 text-base outline-none focus:ring-2 ring-primary/20 transition focus:border-primary focus:ring-primary text-black dark:text-white placeholder:text-gray-400" placeholder="City" type="text" />
                        </label>
                        <label className="flex flex-col">
                            <span className="text-sm font-medium text-text-main dark:text-gray-300 pb-1.5">Postal Code</span>
                            <input className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 px-4 py-3 text-base outline-none focus:ring-2 ring-primary/20 transition focus:border-primary focus:ring-primary text-black dark:text-white placeholder:text-gray-400" placeholder="ZIP / Postal" type="text" />
                        </label>
                        <label className="flex flex-col md:col-span-2">
                            <span className="text-sm font-medium text-text-main dark:text-gray-300 pb-1.5">Phone</span>
                            <div className="relative">
                                <input className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 px-4 py-3 text-base outline-none focus:ring-2 ring-primary/20 transition focus:border-primary focus:ring-primary text-black dark:text-white placeholder:text-gray-400 pl-12" placeholder="(555) 555-5555" type="tel" />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <span className="material-symbols-outlined text-xl">call</span>
                                </div>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-help" title="Needed for shipping updates">
                                    <span className="material-symbols-outlined text-lg">help</span>
                                </div>
                            </div>
                        </label>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-text-main dark:text-white mb-4">Shipping Method</h2>
                    <div className="flex flex-col gap-3">
                        <label className="relative flex cursor-pointer items-center justify-between rounded-xl border border-primary/30 bg-primary/5 p-4 shadow-sm transition hover:border-primary">
                            <div className="flex items-center gap-4">
                                <input defaultChecked className="h-4 w-4 border-gray-300 text-primary focus:ring-primary" name="shipping" type="radio" />
                                <div className="flex flex-col">
                                    <span className="font-bold text-text-main dark:text-white">Standard Shipping</span>
                                    <span className="text-sm text-gray-500">5-7 business days</span>
                                </div>
                            </div>
                            <span className="font-bold text-text-main dark:text-white">Free</span>
                        </label>
                        <label className="relative flex cursor-pointer items-center justify-between rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 p-4 shadow-sm transition hover:border-primary">
                            <div className="flex items-center gap-4">
                                <input className="h-4 w-4 border-gray-300 text-primary focus:ring-primary" name="shipping" type="radio" />
                                <div className="flex flex-col">
                                    <span className="font-bold text-text-main dark:text-white">Express Shipping</span>
                                    <span className="text-sm text-gray-500">1-2 business days</span>
                                </div>
                            </div>
                            <span className="font-bold text-text-main dark:text-white">$15.00</span>
                        </label>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-text-main dark:text-white mb-4">Payment</h2>
                    <div className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 overflow-hidden">
                        <div className="flex border-b border-gray-300 dark:border-gray-700">
                            <button className="flex-1 py-4 text-center font-bold text-primary border-b-2 border-primary bg-primary/5" type="button">
                                Credit Card
                            </button>
                            <button className="flex-1 py-4 text-center font-medium text-gray-500 hover:text-primary transition-colors" type="button">
                                PayPal
                            </button>
                            <button className="flex-1 py-4 text-center font-medium text-gray-500 hover:text-primary transition-colors" type="button">
                                Afterpay
                            </button>
                        </div>
                        <div className="p-6 grid gap-4">
                            <label className="flex flex-col">
                                <span className="text-sm font-medium text-text-main dark:text-gray-300 pb-1.5">Card Number</span>
                                <div className="relative">
                                    <input className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 px-4 py-3 text-base outline-none focus:ring-2 ring-primary/20 transition focus:border-primary focus:ring-primary text-black dark:text-white placeholder:text-gray-400 pl-12" placeholder="0000 0000 0000 0000" type="text" />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <span className="material-symbols-outlined text-xl">credit_card</span>
                                    </div>
                                </div>
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex flex-col">
                                    <span className="text-sm font-medium text-text-main dark:text-gray-300 pb-1.5">Expiration (MM/YY)</span>
                                    <input className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 px-4 py-3 text-base outline-none focus:ring-2 ring-primary/20 transition focus:border-primary focus:ring-primary text-black dark:text-white placeholder:text-gray-400" placeholder="MM / YY" type="text" />
                                </label>
                                <label className="flex flex-col">
                                    <span className="text-sm font-medium text-text-main dark:text-gray-300 pb-1.5">Security Code</span>
                                    <div className="relative">
                                        <input className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 px-4 py-3 text-base outline-none focus:ring-2 ring-primary/20 transition focus:border-primary focus:ring-primary text-black dark:text-white placeholder:text-gray-400" placeholder="CVC" type="text" />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-help" title="3 digits on back of card">
                                            <span class="material-symbols-outlined text-lg">help</span>
                                        </div>
                                    </div>
                                </label>
                            </div>
                            <label className="flex flex-col">
                                <span className="text-sm font-medium text-text-main dark:text-gray-300 pb-1.5">Name on Card</span>
                                <input className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 px-4 py-3 text-base outline-none focus:ring-2 ring-primary/20 transition focus:border-primary focus:ring-primary text-black dark:text-white placeholder:text-gray-400" placeholder="Name as shown on card" type="text" />
                            </label>
                        </div>
                    </div>
                </section>
            </form>
        </div>
    );
}
