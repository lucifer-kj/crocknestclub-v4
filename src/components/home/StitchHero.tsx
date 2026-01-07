export function StitchHero() {
    return (
        <section className="w-full px-4 py-8 sm:px-6 lg:px-8 bg-white dark:from-background-dark dark:to-background-dark">
            <div className="mx-auto max-w-[1280px]">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div className="flex flex-col gap-6 order-2 lg:order-1 text-center lg:text-left">
                        <div className="space-y-4">
                            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                                New Season Arrival
                            </span>
                            <h1 className="text-5xl font-black leading-[0.9] tracking-tighter text-text-main dark:text-white sm:text-6xl md:text-7xl xl:text-8xl">
                                WEAR <br className="hidden lg:block" /> <span className="text-primary">THE REVOLUTION.</span>
                            </h1>
                            <p className="mx-auto lg:mx-0 max-w-lg text-lg text-gray-600 dark:text-gray-300">
                                Exclusive drops for the bold. Join the Crocknest Club for early access to the freshest GenZ fits.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                            <button className="inline-flex h-12 items-center justify-center rounded-lg bg-black px-8 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark">
                                Shop Men
                            </button>
                            <button className="inline-flex h-12 items-center justify-center rounded-lg border border-primary bg-transparent px-8 text-sm font-bold text-text-main dark:text-white hover:bg-primary/5 transition-colors">
                                Shop Women
                            </button>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 lg:aspect-square shadow-2xl shadow-black/10 transform rotate-1 hover:rotate-0 transition-all duration-500 group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0H7TwLQuMZLhcHlc3nJO4FcODAseB8TgYhIkVt1xfUD7SSwZRtchAJyj6E0D-1EiaGhduYhQ6NgpL4MEktVP5zjWl0aKtqC5NhUFPeINpAC9bRwHCm6y2XnD82H8SZoD_Sf82HZPAxAZwO_x957GEbTown_2kWWdQib0aqqg9gYVVuemY1dSVmLzubhxy2DLJdb4T6flab1INxA_FPuOnxZYU5pIFxzVrVlAvi89TMRL6zxhUg8c5nJsErpFbVF8cX42N5dvUO1I"
                                alt="Young model wearing colorful oversized hoodie in neon city street setting"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute bottom-6 left-6 z-20 rounded-lg bg-white/90 dark:bg-background-dark/90 backdrop-blur px-4 py-3 shadow-lg">
                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Featured Look</p>
                                <p className="font-bold text-text-main dark:text-white">Cyber Punk Hoodie</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
