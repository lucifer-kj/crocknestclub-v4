import { StitchProductCard } from "@/components/shop/StitchProductCard";

export function StitchTrending({ products }: { products: any[] }) {
    if (!products || products.length === 0) return null;

    return (
        <>
            <div className="w-full py-12">
                <h2 className="text-center text-3xl font-black tracking-tighter text-text-main dark:text-white md:text-4xl">
                    TRENDING NOW
                </h2>
                <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-primary"></div>
            </div>
            <section className="w-full pb-12 overflow-hidden">
                <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((item) => (
                            <StitchProductCard
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                price={Number(item.basePrice)}
                                image={item.images[0] || ""}
                                category={item.category?.name}
                                variants={item.variants}
                                // Mocking some visual props if they don't exist in DB schema yet
                                colors={item.variants?.slice(0, 3).map((v: any) => v.color || '#000')}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
