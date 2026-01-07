export function SidebarFilters() {
    return (
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
            <div className="sticky top-24 space-y-6">
                <div className="flex items-center justify-between lg:hidden pb-4 border-b border-primary/30">
                    <span className="font-bold text-lg text-black dark:text-white">Filters</span>
                    <button className="text-primary font-medium text-sm">Reset All</button>
                </div>

                <div className="space-y-4">
                    <details className="group border-b border-primary/30 dark:border-white/10 pb-4" open>
                        <summary className="flex cursor-pointer items-center justify-between py-2 list-none hover:text-primary transition-colors text-black dark:text-white">
                            <span className="font-bold text-base">Category</span>
                            <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-primary">expand_more</span>
                        </summary>
                        <div className="pt-2 space-y-2">
                            {['T-Shirts', 'Hoodies', 'Jackets', 'Accessories', 'Bottoms'].map((cat) => (
                                <label key={cat} className="flex items-center gap-3 cursor-pointer group/item">
                                    <input className="size-4 rounded border-primary text-black focus:ring-primary focus:ring-opacity-40 bg-gray-50" type="checkbox" />
                                    <span className="text-gray-600 dark:text-gray-400 group-hover/item:text-black dark:group-hover/item:text-white transition-colors font-medium">{cat}</span>
                                </label>
                            ))}
                        </div>
                    </details>

                    <details className="group border-b border-primary/30 dark:border-white/10 pb-4">
                        <summary className="flex cursor-pointer items-center justify-between py-2 list-none hover:text-primary transition-colors text-black dark:text-white">
                            <span className="font-bold text-base">Size</span>
                            <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-primary">expand_more</span>
                        </summary>
                        <div className="pt-3 flex flex-wrap gap-2">
                            {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                                <button key={size} className="h-10 w-10 flex items-center justify-center rounded-lg border border-primary/50 hover:border-black hover:bg-black hover:text-white transition-all text-sm font-bold bg-white dark:bg-white/5 text-black dark:text-white">
                                    {size}
                                </button>
                            ))}
                        </div>
                    </details>

                    <details className="group border-b border-primary/30 dark:border-white/10 pb-4">
                        <summary className="flex cursor-pointer items-center justify-between py-2 list-none hover:text-primary transition-colors text-black dark:text-white">
                            <span className="font-bold text-base">Color</span>
                            <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-primary">expand_more</span>
                        </summary>
                        <div className="pt-3 flex flex-wrap gap-3">
                            {['#000000', '#ffffff', '#0040ff', '#ef4444', '#22c55e'].map((color) => (
                                <button key={color} className="size-6 rounded-full border border-gray-200 shadow-sm hover:ring-2 hover:ring-offset-2 hover:ring-primary" style={{ backgroundColor: color }}></button>
                            ))}
                        </div>
                    </details>
                </div>

                <div className="hidden lg:flex flex-col rounded-xl overflow-hidden bg-black text-white relative h-64 justify-end p-6 group cursor-pointer border-2 border-primary shadow-lg shadow-blue-500/20">
                    <div
                        className="absolute inset-0 w-full h-full bg-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCY_cy5ip869FOCiQ-s0IxrlJGvpmze2Mg0g21oDr1vOUkuGPhWDFWYt-jXkcCIdWOwr7XKAjTuyVx0iLnfZ0P-ModNqozodpLH9njDgZ8ExGS6jpaQEQta9zPopAOZGykN9RZGLlahL6GGFqvaEZ2W78XdMyBTHiot_eZG61wpbYG5DrfPfe8pCmwkCQ5SBqlzIQuxJXBMM7rrZj56kplN_0K1XZDZwt2pLYuPC_ItPgmyX3PgEROTlLSYXLRa878hYllF9W792Jg")' }}
                    ></div>
                    <div className="relative z-10">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Exclusive</p>
                        <h3 className="text-xl font-black mb-3 leading-tight">Join the<br />Club Now</h3>
                        <button className="bg-white text-black border border-transparent px-4 py-2 rounded-lg text-sm font-bold w-full hover:bg-gray-200 transition-colors">Sign Up</button>
                    </div>
                </div>
            </div>
        </aside>
    );
}
