"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function SearchInput() {
    const router = useRouter();
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="hidden md:flex w-full max-w-[240px] items-center rounded-full bg-gray-100 dark:bg-white/5 px-4 py-2 border border-primary/30 transition-all focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
            <span className="material-symbols-outlined text-gray-400 dark:text-gray-400 text-[20px]">search</span>
            <input
                className="w-full bg-transparent border-none text-sm p-0 pl-2 text-text-main dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-0 outline-none"
                placeholder="Search drops..."
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </form>
    );
}

export function StitchHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-primary/30 bg-surface-light/80 dark:bg-background-dark/80 backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white transition-transform group-hover:rotate-12 ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark">
                            <span className="material-symbols-outlined text-[24px]">bolt</span>
                        </div>
                        <h2 className="text-text-main dark:text-white text-xl font-black tracking-tighter hidden md:block group-hover:text-primary transition-colors">CROCKNESTCLUB</h2>
                    </Link>
                    <nav className="hidden lg:flex items-center gap-6">
                        <Link href="/shop" className="text-text-main dark:text-gray-300 hover:text-primary text-sm font-bold uppercase tracking-wide transition-colors">Shop All</Link>
                        <Link href="/shop?category=men" className="text-text-main dark:text-gray-300 hover:text-primary text-sm font-bold uppercase tracking-wide transition-colors">Men</Link>
                        <Link href="/shop?category=women" className="text-text-main dark:text-gray-300 hover:text-primary text-sm font-bold uppercase tracking-wide transition-colors">Women</Link>
                        <Link href="/shop?category=accessories" className="text-text-main dark:text-gray-300 hover:text-primary text-sm font-bold uppercase tracking-wide transition-colors">Accessories</Link>
                        <Link href="/drops" className="text-primary hover:text-primary-dark text-sm font-bold uppercase tracking-wide transition-colors">Drops</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <Suspense fallback={<div className="w-[240px]" />}>
                        <SearchInput />
                    </Suspense>

                    <div className="flex gap-2">
                        <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-text-main dark:text-white transition-colors md:hidden">
                            <span className="material-symbols-outlined text-[24px]">search</span>
                        </button>
                        <Link href="/account" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-text-main dark:text-white transition-colors">
                            <span className="material-symbols-outlined text-[24px]">person</span>
                        </Link>
                        <Link href="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-text-main dark:text-white transition-colors">
                            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
                            <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-white dark:ring-background-dark"></span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
