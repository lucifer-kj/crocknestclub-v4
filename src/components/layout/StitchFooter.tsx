import Link from 'next/link';

export function StitchFooter() {
    return (
        <footer className="w-full border-t border-primary/20 bg-background-light dark:bg-background-dark pt-16 pb-8">
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between gap-10 mb-16">
                    <div className="max-w-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-black text-white ring-1 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark">
                                <span className="material-symbols-outlined text-[18px]">bolt</span>
                            </div>
                            <span className="text-lg font-black tracking-tight text-text-main dark:text-white">CROCKNESTCLUB</span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 font-medium leading-relaxed">
                            Redefining streetwear for the digital generation. Quality drops, limited runs, global shipping.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors hover:scale-110 transform duration-200">
                                <span className="sr-only">Instagram</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors hover:scale-110 transform duration-200">
                                <span className="sr-only">TikTok</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.63 2.58-4.9 2.09-1.81 5.19-1.94 7.42-.31.53.38 1.05.81 1.54 1.28l-3.35 2.56c-.55-.54-1.22-1-2.01-1.22-.88-.22-1.8-.18-2.65.18-.84.34-1.57.94-2.04 1.71-.7 1.14-.64 2.6.14 3.7.8 1.15 2.12 1.71 3.46 1.71 1.61-.02 3.11-.83 3.99-2.17.65-1.01.91-2.2.91-3.39V4.71a7.276 7.276 0 0 0 4.96-4.69z"></path></svg>
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16 w-full lg:w-auto">
                        <div>
                            <h4 className="font-bold mb-6 text-black dark:text-white">Shop</h4>
                            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                                <li><Link href="/shop" className="hover:text-primary transition-colors">New Arrivals</Link></li>
                                <li><Link href="/shop" className="hover:text-primary transition-colors">Best Sellers</Link></li>
                                <li><Link href="/shop" className="hover:text-primary transition-colors">Accessories</Link></li>
                                <li><Link href="/shop" className="hover:text-primary transition-colors">Sale</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-black dark:text-white">Support</h4>
                            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                                <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Returns</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Size Guide</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            </ul>
                        </div>
                        <div className="hidden sm:block">
                            <h4 className="font-bold mb-6 text-black dark:text-white">Legal</h4>
                            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-white/10 pt-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">
                        © 2024 CROCKNESTCLUB. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                        Powered by <span className="font-bold text-black dark:text-white">Stitch</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
