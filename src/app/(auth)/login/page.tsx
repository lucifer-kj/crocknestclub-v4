"use client";

import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 lg:p-8 bg-gray-50 dark:bg-background-dark">
            <div className="w-full max-w-md bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden relative">
                <div className="h-1 w-full bg-gradient-to-r from-primary to-black dark:to-white"></div>
                <div className="p-8 flex flex-col gap-6 relative z-10">
                    <div className="space-y-2 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit mx-auto">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Login</span>
                        </div>
                        <h2 className="text-3xl font-black tracking-tight text-black dark:text-white">Welcome Back</h2>
                        <p className="text-gray-500">Log in to access your unique collection.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 h-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-all text-black dark:text-white">
                            <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWK_6tVW-9J5oPVUL_NuojACIGZ1v2wEWF1QX5eYsvKMyRgKOEXC4dG9_2lW-wxqZDzkFdUmBpxlyUpnrQKw0omeQnAj7ZVx8uxcg4kZbPk4FK8Zicf-eu5bZpFgBAzh5vwlli-zZ0zXifS2CI_FMOKjxBJWGU-qi2p6Ih023wrW_hMHa_DK-F9D6c4zJIhzbjo03LOb_F4YhqL7kYP27_R2gfkv1EOVFZbKC9IuZyNCiEF2Md27dau5mwtkw2WNsnYGQAx_3qJHc" />
                            <span className="text-sm font-bold">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 h-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-all text-black dark:text-white">
                            <span className="material-symbols-outlined text-xl">ios</span>
                            <span className="text-sm font-bold">Apple</span>
                        </button>
                    </div>

                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-white/10"></div></div>
                        <span className="relative bg-white dark:bg-surface-dark px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Or</span>
                    </div>

                    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                        <label className="space-y-2">
                            <span className="text-sm font-bold text-black dark:text-white">Email Address</span>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">mail</span>
                                <input className="w-full h-12 pl-12 pr-4 rounded-lg bg-white dark:bg-black/20 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary text-black dark:text-white placeholder:text-gray-400 text-sm transition-all" placeholder="name@example.com" type="email" />
                            </div>
                        </label>
                        <label className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-black dark:text-white">Password</span>
                                <Link className="text-xs font-bold text-primary hover:text-primary-dark" href="/forgot-password">Forgot Password?</Link>
                            </div>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">lock</span>
                                <input className="w-full h-12 pl-12 pr-4 rounded-lg bg-white dark:bg-black/20 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary text-black dark:text-white placeholder:text-gray-400 text-sm transition-all" placeholder="••••••••" type="password" />
                            </div>
                        </label>
                        <Link href="/account" className="mt-4 flex items-center justify-center w-full h-12 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-sm tracking-wide shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98]">
                            SIGN IN TO THE NEST
                        </Link>
                    </form>
                    <p className="text-center text-sm text-gray-500">
                        Not a member yet? <Link className="font-bold text-primary hover:underline" href="/register">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
