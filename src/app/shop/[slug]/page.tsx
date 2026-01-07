import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductInfo } from "@/components/shop/ProductInfo";
import Link from 'next/link';
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { RecentlyViewedTracker } from "@/components/product/RecentlyViewedTracker";
import { RecentlyViewedList } from "@/components/product/RecentlyViewedList";

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
    // Note: 'slug' in the URL is currently functioning as ID in the simple setup,
    // or we query by ID if the route is /shop/[id].
    // If the route is /shop/[slug], we need to find by slug or ID.
    // The previous code had `params: { slug: string }`.
    // Let's assume we try to find by ID first (standard Next.js dynamic route behavior often uses ID or unique slug).
    // Given the previous links were `/shop/${id}`, `slug` is actually the ID.

    const product = await prisma.product.findUnique({
        where: { id: params.slug },
        include: {
            variants: true,
            category: true
        }
    });

    if (!product) {
        return notFound();
    }

    const mapProductForTracker = {
        id: product.id,
        title: product.title,
        price: `$${product.basePrice.toString()}`,
        image: product.images[0] || "",
        category: product.category?.name
    };

    return (
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-6">
            <RecentlyViewedTracker product={mapProductForTracker} />

            <nav className="flex mb-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
                <span className="mx-2">/</span>
                <span className="text-black dark:text-white">{product.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
                <ProductGallery images={product.images} />
                <ProductInfo
                    title={product.title}
                    price={`$${product.basePrice.toString()}`}
                    oldPrice={undefined} // Schema doesn't have oldPrice yet
                    description={product.description}
                />
            </div>

            <RecentlyViewedList />
        </div>
    );
}
