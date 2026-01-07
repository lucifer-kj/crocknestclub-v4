export function SearchFiltersBar() {
    return (
        <div className="sticky top-20 z-30 bg-white/95 dark:bg-background-dark/95 backdrop-blur py-4 mb-6 border-b border-gray-100 dark:border-white/10 -mx-4 px-4 md:px-0 md:mx-0 md:border-none md:bg-transparent">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap">
                <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:bg-primary transition-colors shrink-0">
                    <span className="material-symbols-outlined text-[20px]">tune</span>
                    <span className="text-sm font-bold">Filters</span>
                </button>
                <div className="h-6 w-px bg-gray-200 dark:bg-white/10 mx-1 shrink-0"></div>

                {['Price Range', 'Size', 'Color'].map((filter) => (
                    <button key={filter} className="group flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full hover:border-primary hover:bg-primary/5 transition-all shrink-0">
                        <span className="text-sm font-medium group-hover:text-primary text-black dark:text-white">{filter}</span>
                        <span className="material-symbols-outlined text-[18px] text-gray-400 group-hover:text-primary">expand_more</span>
                    </button>
                ))}

                <button className="flex items-center gap-1 pl-3 pr-2 py-2 bg-primary/10 border border-primary/20 rounded-full shrink-0">
                    <span className="text-sm font-bold text-primary">In Stock</span>
                    <span className="material-symbols-outlined text-[18px] text-primary hover:bg-primary/10 rounded-full p-0.5">close</span>
                </button>
            </div>
        </div>
    );
}
