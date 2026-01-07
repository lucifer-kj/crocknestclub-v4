"use client";

import { useState } from "react";
import { useCart } from "@/store/cart-context";
import { createOrder } from "@/app/checkout/actions";
import { useRouter } from "next/navigation";

export function CheckoutForm() {
    const { items, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zip: "",
        phone: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.type === "email" ? "email" : e.target.placeholder === "First name" ? "firstName" : e.target.placeholder === "Last name" ? "lastName" : e.target.placeholder === "City" ? "city" : e.target.placeholder === "ZIP / Postal" ? "zip" : e.target.type === "tel" ? "phone" : "address"]: e.target.value });
        // Note: The placeholder mapping is brittle, normally utilize name attribute.
    };

    // Better handler using name attributes (Updated JSX below to use name attributes)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const shippingInfo = {
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                address: formData.address,
                city: formData.city,
                zip: formData.zip,
                country: "IN",
                email: formData.email
            };

            const result = await createOrder(items, cartTotal, shippingInfo);

            if (result.success && result.redirectUrl) {
                // Instamojo Redirect
                window.location.href = result.redirectUrl;
            } else if (result.success) {
                // Dev/Success
                clearCart();
                router.push(`/checkout/success?orderId=${result.orderId}`);
            } else {
                alert(`Checkout Failed: ${result.error}`);
            }
        } catch (error) {
            console.error(error);
            alert("An unexpected error occurred.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex-1 px-4 py-8 lg:px-10 lg:py-12 lg:border-r border-primary/20">
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                    <h1 className="text-3xl font-bold tracking-tight text-text-main dark:text-white">Checkout</h1>
                    <div className="flex items-center gap-2 text-primary font-medium bg-primary/5 border border-primary/20 px-3 py-1 rounded-lg">
                        <span className="material-symbols-outlined text-sm">timer</span>
                        <span className="text-sm">Cart reserved for <span className="font-bold">10:00</span></span>
                    </div>
                </div>
            </div>

            <form className="space-y-10" onSubmit={handleSubmit}>
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-text-main dark:text-white">Contact Information</h2>
                    </div>
                    <div className="grid gap-4">
                        <label className="flex flex-col w-full">
                            <span className="text-sm font-medium text-text-main dark:text-gray-300 pb-1.5">Email address</span>
                            <input
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 px-4 py-3 text-base outline-none focus:ring-2 ring-primary/20 transition focus:border-primary focus:ring-primary text-black dark:text-white placeholder:text-gray-400"
                                placeholder="you@example.com"
                                type="email"
                            />
                        </label>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-text-main dark:text-white mb-4">Shipping Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col">
                            <span className="text-sm font-medium text-text-main dark:text-gray-300 pb-1.5">First name</span>
                            <input name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 px-4 py-3 text-base outline-none focus:ring-2 ring-primary/20 transition focus:border-primary focus:ring-primary text-black dark:text-white placeholder:text-gray-400" placeholder="First name" type="text" />
                        </label>
                        <label className="flex flex-col">
                            <span className="text-sm font-medium text-text-main dark:text-gray-300 pb-1.5">Last name</span>
                            <input name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 px-4 py-3 text-base outline-none focus:ring-2 ring-primary/20 transition focus:border-primary focus:ring-primary text-black dark:text-white placeholder:text-gray-400" placeholder="Last name" type="text" />
                        </label>
                        <label className="flex flex-col md:col-span-2">
                            <span className="text-sm font-medium text-text-main dark:text-gray-300 pb-1.5">Address</span>
                            <input name="address" required value={formData.address} onChange={handleChange} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 px-4 py-3 text-base outline-none focus:ring-2 ring-primary/20 transition focus:border-primary focus:ring-primary text-black dark:text-white placeholder:text-gray-400" placeholder="Street address" type="text" />
                        </label>
                        <label className="flex flex-col">
                            <span className="text-sm font-medium text-text-main dark:text-gray-300 pb-1.5">City</span>
                            <input name="city" required value={formData.city} onChange={handleChange} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 px-4 py-3 text-base outline-none focus:ring-2 ring-primary/20 transition focus:border-primary focus:ring-primary text-black dark:text-white placeholder:text-gray-400" placeholder="City" type="text" />
                        </label>
                        <label className="flex flex-col">
                            <span className="text-sm font-medium text-text-main dark:text-gray-300 pb-1.5">Postal Code</span>
                            <input name="zip" required value={formData.zip} onChange={handleChange} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 px-4 py-3 text-base outline-none focus:ring-2 ring-primary/20 transition focus:border-primary focus:ring-primary text-black dark:text-white placeholder:text-gray-400" placeholder="ZIP Code" type="text" />
                        </label>
                        <label className="flex flex-col md:col-span-2">
                            <span className="text-sm font-medium text-text-main dark:text-gray-300 pb-1.5">Phone</span>
                            <input name="phone" required value={formData.phone} onChange={handleChange} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 px-4 py-3 text-base outline-none focus:ring-2 ring-primary/20 transition focus:border-primary focus:ring-primary text-black dark:text-white placeholder:text-gray-400" placeholder="(555) 555-5555" type="tel" />
                        </label>
                    </div>
                </section>

                <button
                    type="submit"
                    disabled={isProcessing || items.length === 0}
                    className="w-full rounded-xl bg-black dark:bg-white text-white dark:text-black py-4 text-lg font-bold shadow-lg shadow-black/20 border border-primary transition hover:bg-gray-900 hover:shadow-black/40 items-center justify-center gap-2 hover:-translate-y-1 transform duration-200 flex disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isProcessing ? "Processing..." : `Pay ₹${cartTotal.toFixed(2)}`}
                    {!isProcessing && <span className="material-symbols-outlined">arrow_forward</span>}
                </button>
            </form>
        </div>
    );
}
