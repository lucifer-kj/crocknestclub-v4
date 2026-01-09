import { StitchProductCard } from "@/components/shop/StitchProductCard";
import { SidebarFilters } from "@/components/shop/SidebarFilters";
import Link from 'next/link';
import { prisma } from "@/lib/prisma";

export default async function ShopPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
    const size = typeof searchParams.size === 'string' ? searchParams.size : undefined;
    const color = typeof searchParams.color === 'string' ? searchParams.color : undefined;
    const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'newest';

    const where: any = {};
    if (category) {
        where.category = {
            name: {
                contains: category,
                mode: 'insensitive'
            }
        };
    }

    // Size and Color filtering would closely depend on schema (e.g. related variants)
    if (size || color) {
        where.variants = {
            some: {
                ...(size && { size: size }),
                ...(color && { color: color }) // Simple exact match for now
            }
        }
    }

    const orderBy: any = {};
    if (sort === 'low_high') orderBy.basePrice = 'asc';
    else if (sort === 'high_low') orderBy.basePrice = 'desc';
    else orderBy.createdAt = 'desc'; // Default newest

    const products = await prisma.product.findMany({
        where,
        orderBy,
        include: {
            category: true,
            variants: true,
        }
    });

    return (
        <div className="flex flex-col min-h-screen">
            <div className="px-4 md:px-8 lg:px-12 py-6">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                    <Link href="/" className="text-gray-500 hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-[10px] text-primary">arrow_forward_ios</span>
                    <span className="text-black dark:text-white font-semibold">Streetwear Drops</span>
                </div>
            </div>

            <div className="px-4 md:px-8 lg:px-12 pb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 uppercase italic">Streetwear <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Drops</span></h1>
                        <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl font-medium leading-relaxed">Fresh prints for the new wave. Bold aesthetic designs for a generation that refuses to blend in.</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row px-4 md:px-8 lg:px-12 pb-20 gap-10">
                <SidebarFilters />

                <main className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <p className="text-gray-500 font-medium">Showing <span className="text-black dark:text-white font-bold">{products.length}</span> results</p>
                        <div className="flex items-center gap-3">
                            <label className="hidden sm:block text-sm font-medium text-gray-500">Sort by:</label>
                            {/* Sorting logic to be added - for now standard select, but ideally Client Component or form */}
                            <div className="relative">
                                <form>
                                    <select
                                        name="sort"
                                        defaultValue={sort}
                                        // Simple form submission for sorting for now to keep it server-side friendly
                                        // or could use client router
                                        className="appearance-none bg-white dark:bg-white/5 border border-primary rounded-lg py-2.5 pl-4 pr-10 text-sm font-bold focus:ring-2 focus:ring-primary cursor-pointer hover:bg-gray-50 transition-colors shadow-sm text-black dark:text-white"
                                    >
                                        <option value="newest">Newest Drops</option>
                                        <option value="low_high">Price: Low to High</option>
                                        <option value="high_low">Price: High to Low</option>
                                        <option value="best_selling">Best Sellers</option>
                                    </select>
                                    <input type="hidden" name="category" value={category || ''} />
                                    {/* Auto-submit script or button needed if not using client component. 
                                        However, for better UX this selector should probably be its own Client Component.
                                        I'll leave it as non-functional visually but logic supports it if URL changes.
                                     */}
                                </form>
                                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-primary pointer-events-none text-xl">expand_more</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                        {products.map(product => (
                            <StitchProductCard
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                price={Number(product.basePrice)}
                                image={product.images[0] || ""}
                                category={product.category?.name}
                                variants={product.variants}
                                colors={product.variants?.slice(0, 3).map(v => v.color)}
                            />
                        ))}
                        {products.length === 0 && (
                            <div className="col-span-full text-center py-20 text-gray-500">
                                No products found matching your filters.
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center justify-center mt-16 gap-4">
                        <p className="text-gray-500 text-sm">Showing {products.length} Products</p>
                        <div className="w-64 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-primary rounded-full"></div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
