"use client";

import Link from 'next/link';

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 lg:p-8 bg-gray-50 dark:bg-background-dark">
            <div className="w-full max-w-md bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="p-8 flex flex-col h-full relative z-10">
                    <div className="mb-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-primary/10 border border-primary/20 w-fit mx-auto">
                            <span className="material-symbols-outlined text-sm text-primary">lock_reset</span>
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Recovery</span>
                        </div>
                        <h2 className="text-3xl font-black tracking-tight text-black dark:text-white mb-3">Forgot Password?</h2>
                        <p className="text-gray-500 mb-8">
                            Don't worry, it happens to the best of us. Enter your email below to recover your account.
                        </p>
                        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                            <label className="space-y-2 text-left">
                                <span className="text-sm font-bold text-black dark:text-white">Registered Email</span>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">alternate_email</span>
                                    <input className="w-full h-12 pl-12 pr-4 rounded-lg bg-white dark:bg-black/20 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary text-black dark:text-white placeholder:text-gray-400 text-sm transition-all" placeholder="name@example.com" type="email" />
                                </div>
                            </label>
                            <button className="w-full h-12 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-sm tracking-wide shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2">
                                <span>SEND RESET LINK</span>
                                <span className="material-symbols-outlined text-sm">send</span>
                            </button>
                        </form>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/10 flex justify-center">
                        <Link href="/login" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
