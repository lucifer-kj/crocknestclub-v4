import Link from 'next/link';

export function CheckoutHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-primary/30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-6 py-4 lg:px-10">
            <div className="mx-auto flex max-w-[1280px] items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex bg-black text-white size-8 items-center justify-center rounded-lg ring-1 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark transition-transform group-hover:rotate-12">
                            <span className="material-symbols-outlined text-[18px]">bolt</span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight text-text-main dark:text-white group-hover:text-primary transition-colors">CROCKNESTCLUB</h2>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm font-medium">
                        <span className="material-symbols-outlined text-lg">lock</span>
                        <span>Secure Checkout</span>
                    </div>
                    <Link href="/cart" className="relative rounded-full bg-primary/5 border border-primary/20 p-2 text-primary transition hover:bg-primary hover:text-white dark:bg-white/10 dark:text-white dark:hover:bg-primary dark:hover:text-white">
                        <span className="material-symbols-outlined block">shopping_cart</span>
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white border-2 border-background-light dark:border-background-dark">2</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
