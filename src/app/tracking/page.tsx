import Link from 'next/link';
import { StitchHeader } from "@/components/layout/StitchHeader";
import { StitchFooter } from "@/components/layout/StitchFooter";
import { TrackingTimeline } from "@/components/cart/TrackingTimeline";

export default function TrackingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-background-dark">
            <StitchHeader />

            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-text-main dark:text-white">Where's my fit?</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">Tracking Order <span className="font-bold text-primary">#88291</span></p>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-bold bg-primary/10 px-4 py-2 rounded-lg border border-primary/20">
                        <span className="material-symbols-outlined">local_shipping</span>
                        <span>Est. Delivery: Friday, Oct 24th</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-7 space-y-8">
                        <TrackingTimeline />

                        <div className="bg-gradient-to-br from-black to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                                Shipping Details
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8 relative z-10">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">Delivery Address</p>
                                    <p className="font-medium text-lg leading-relaxed text-white">
                                        Alex Johnson<br />
                                        1245 Electric Avenue, Apt 4B<br />
                                        Brooklyn, NY 11211
                                    </p>
                                </div>
                                <div className="flex flex-col justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">Tracking Number</p>
                                        <p className="font-mono text-lg text-primary">TRK-99283-CNZ</p>
                                    </div>
                                    <div className="mt-6 md:mt-0">
                                        <button className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                                            Track on FedEx
                                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-white dark:bg-black/20 border border-primary/20 rounded-2xl p-6 md:p-8 shadow-sm">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-text-main dark:text-white">
                                <span className="material-symbols-outlined text-primary">shopping_bag</span>
                                Items in Order (3)
                            </h2>
                            <div className="space-y-6">
                                <div className="flex gap-4 group">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5">
                                        <img alt="Cyber-Goth Oversized Tee" className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ6RXc9bfPDqupsi_Z4ZFly0gI1abMV-KqqOt8wyy0t2iohBanb_mu4jyS-zrsQM3SY9diLsv-SvdNSneXp_1UJPvFapUFX6-CSATaF7tajPNsY4DJ0SDvhrZW8c3v81asY6jMepnDN-sdVjPb6BvMm8jMLYrtSKpQnGV-svIij8j_K3f3avBTZ8rQvlp0WtaWfxq0VgXTWN3ss1SBS0H_4MgfdCQz9G0z3JuO_wIDZMAIIf8cxXGK3x684VU0Xdh6FQLFQ-WUtGw" />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-center">
                                        <h3 className="text-base font-bold text-text-main dark:text-white leading-tight">Cyber-Goth Oversized Tee</h3>
                                        <p className="mt-1 text-sm text-gray-500">Size: L • Color: Black</p>
                                        <p className="mt-2 text-sm font-bold text-primary">$45.00</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 group">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5">
                                        <img alt="Volt Runner Sneakers" className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC_wkwzMjwOpL6kMH-PFwfWOvMdukkaRCoTRvF1IU261Uiomoux4cFn5H8B78aBcEDYcJ6QElxnze8DlVeqKKJJE9oG0D8Hp9l53xURDv7sR6YDvsJm9OBbTDTe3yLVYHg3pI155nqKQD_GWjPIW3Rg4_ew0CWOYAE_HYtER_TTWfFlwghI58b5-OscpLDfrq0hpTtREa2OO6QYNh97AtE858UUhaTiqo-aqGlDJFTIjXx1VFS6JagAf5uExo-hne46gJsgQ8RoJY" />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-center">
                                        <h3 className="text-base font-bold text-text-main dark:text-white leading-tight">Volt Runner Sneakers</h3>
                                        <p className="mt-1 text-sm text-gray-500">Size: US 10 • Color: White/Blue</p>
                                        <p className="mt-2 text-sm font-bold text-primary">$89.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-black/20 border border-primary/20 rounded-2xl p-6 md:p-8 shadow-sm">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-text-main dark:text-white">
                                <span className="material-symbols-outlined text-primary">receipt_long</span>
                                Payment Summary
                            </h2>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Subtotal</span>
                                    <span>$149.00</span>
                                </div>
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Shipping</span>
                                    <span>$12.00</span>
                                </div>
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Tax (8%)</span>
                                    <span>$11.92</span>
                                </div>
                                <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex justify-between items-center">
                                    <span className="text-base font-bold text-text-main dark:text-white">Total Amount</span>
                                    <span className="text-xl font-black text-primary">$172.92</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 flex items-center justify-between border border-dashed border-gray-300 dark:border-white/10">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-gray-400">headset_mic</span>
                                <span className="text-sm font-medium text-text-main dark:text-white">Need help with this order?</span>
                            </div>
                            <button className="text-sm font-bold text-primary hover:underline">Chat with us</button>
                        </div>
                    </div>
                </div>
            </main>

            <StitchFooter />
        </div>
    );
}
