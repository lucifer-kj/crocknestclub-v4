"use client";

import Link from 'next/link';
import { register } from './actions';
import { useState } from 'react';

export default function RegisterPage() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleRegister(formData: FormData) {
        setIsLoading(true);
        setError(null);

        // Basic match check could go here, but relying on server/form for now
        const newsletter = formData.get("newsletter");

        const result = await register(formData);

        if (result?.error) {
            setError(result.error);
            setIsLoading(false);
        } else {
            // Success assumes redirect in action, or show success message
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 lg:p-8 bg-gray-50 dark:bg-background-dark">
            <div className="w-full max-w-md bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden relative">
                <div className="h-1 w-full bg-gradient-to-r from-primary to-black dark:to-white"></div>
                <div className="p-8 flex flex-col gap-6 relative z-10">
                    <div className="space-y-2 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit mx-auto">
                            <span className="w-2 h-2 rounded-full bg-primary/50"></span>
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Register</span>
                        </div>
                        <h2 className="text-3xl font-black tracking-tight text-black dark:text-white">Join the Club</h2>
                        <p className="text-gray-500">Get exclusive access to the latest drops.</p>
                    </div>

                    <form className="flex flex-col gap-4" action={handleRegister}>
                        {error && <div className="text-red-500 text-sm text-center font-medium bg-red-50 dark:bg-red-900/10 p-2 rounded">{error}</div>}
                        <div className="space-y-2">
                            <label className="space-y-2">
                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">First Name</span>
                                <input name="name" required className="w-full h-12 px-4 rounded-lg bg-white dark:bg-black/20 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary text-black dark:text-white placeholder:text-gray-400 text-sm transition-all" type="text" />
                            </label>
                            {/* Original register only had one Name field, merging UI for 'First Name' to be the name */}
                        </div>
                        <label className="space-y-2">
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Email</span>
                            <input name="email" required className="w-full h-12 px-4 rounded-lg bg-white dark:bg-black/20 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary text-black dark:text-white placeholder:text-gray-400 text-sm transition-all" type="email" />
                        </label>
                        <label className="space-y-2">
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Password</span>
                            <input name="password" required className="w-full h-12 px-4 rounded-lg bg-white dark:bg-black/20 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary text-black dark:text-white placeholder:text-gray-400 text-sm transition-all" type="password" />
                        </label>

                        <div className="flex items-start gap-3 mt-2">
                            <input className="mt-1 rounded border-primary text-primary focus:ring-primary bg-transparent" id="newsletter" name="newsletter" type="checkbox" />
                            <label className="text-xs text-gray-500 leading-normal" htmlFor="newsletter">
                                I agree to the <Link className="text-primary hover:underline" href="/legal">Terms of Service</Link> and <Link className="text-primary hover:underline" href="/legal">Privacy Policy</Link>.
                            </label>
                        </div>

                        <button type="submit" disabled={isLoading} className="mt-4 flex items-center justify-center w-full h-12 rounded-lg bg-white dark:bg-black border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold text-sm tracking-wide transition-all transform active:scale-[0.98] disabled:opacity-70">
                            {isLoading ? "CREATING..." : "CREATE ACCOUNT"}
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-500">
                        Already have an account? <Link className="font-bold text-primary hover:underline" href="/login">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
