import Link from 'next/link';
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StitchProductCard } from "@/components/shop/StitchProductCard";

export const dynamic = 'force-dynamic';

export default async function CollectionPage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const category = await prisma.category.findUnique({
        where: { slug: slug },
        include: {
            products: {
                include: {
                    category: true
                }
            }
        }
    });

    if (!category) {
        return notFound();
    }

    return (
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
            <div className="flex flex-col items-center text-center mb-16">
                <span className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">Collection</span>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black dark:text-white uppercase mb-6">
                    {category.name}
                </h1>
                <p className="max-w-2xl text-gray-500 text-lg">
                    Browse our exclusive selection of {category.name.toLowerCase()}.
                </p>
            </div>

            {category.products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
                    {category.products.map(product => (
                        <StitchProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            category={category.name}
                            price={`$${product.basePrice.toString()}`}
                            image={product.images[0] || ""}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-2xl">
                    <p className="text-xl font-bold text-gray-400">No products found in this collection yet.</p>
                    <Link href="/shop" className="mt-6 inline-block text-primary hover:underline font-bold">
                        Browse all products
                    </Link>
                </div>
            )}
        </div>
    );
}
