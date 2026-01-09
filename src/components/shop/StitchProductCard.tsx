"use client";

import Link from 'next/link';
import { useCart } from '@/store/cart-context';
import { useState } from 'react';
import { WishlistButton } from "@/components/wishlist/WishlistButton";

interface ProductCardProps {
    id: string;
    title: string;
    price: number | string;
    oldPrice?: string;
    image: string;
    category?: string;
    tags?: string[];
    colors?: string[];
    variants?: any[]; // Using any for now to be flexible with prisma payload or mock
    scarcityLevel?: "LOW" | "MEDIUM" | "HIGH";
    initialStock?: number;
    initialIsWishlisted?: boolean;
}

export function StitchProductCard({
    id,
    title,
    price,
    oldPrice,
    image,
    category,
    tags,
    colors,
    variants,
    scarcityLevel,
    initialStock,
    initialIsWishlisted = false
}: ProductCardProps) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    // Stock Logic (Simplified for now, can be expanded with swr like legacy card if needed)
    const isOutOfStock = initialStock === 0;
    const isLowStock = initialStock !== undefined && initialStock > 0 && initialStock <= 5;

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation
        e.stopPropagation();

        if (isOutOfStock) return;

        setIsAdding(true);

        // Simulating delay for effect
        setTimeout(() => {
            // Logic to find default variant or use placeholder
            // If real variants exist, use the first one
            const variantId = variants && variants.length > 0 ? variants[0].id : id;

            addToCart({
                productId: id,
                variantId: variantId,
                title: title,
                price: typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price,
                image: image,
                size: variants && variants.length > 0 ? variants[0].size : 'M', // Default fallback
                color: variants && variants.length > 0 ? variants[0].color : 'Default',
                quantity: 1
            });
            setIsAdding(false);
            // Optionally could trigger a toast here
            alert("Added to cart!");
        }, 500);
    };

    return (
        <div className="group product-card flex flex-col gap-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-50 dark:bg-white/5 border border-primary/30 hover:border-primary transition-colors duration-300">
                {/* Badges Container */}
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 items-start">
                    {tags && tags.length > 0 && (
                        <span className="bg-black text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded border border-primary shadow-sm">
                            {tags[0]}
                        </span>
                    )}
                    {isLowStock && !isOutOfStock && (
                        <span className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded border border-black animate-pulse shadow-sm">
                            Low Stock: {initialStock} Left
                        </span>
                    )}
                    {!isOutOfStock && scarcityLevel === "HIGH" && (
                        <span className="bg-purple-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded border border-black shadow-sm">
                            Limited
                        </span>
                    )}
                    {!isOutOfStock && scarcityLevel === "MEDIUM" && (
                        <span className="bg-primary text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded border border-primary-dark shadow-sm">
                            Hot
                        </span>
                    )}
                </div>

                {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 pointer-events-none">
                        <span className="bg-red-600 text-white px-3 py-1 font-black uppercase text-xl transform -rotate-12 border-2 border-white shadow-xl">
                            SOLD OUT
                        </span>
                    </div>
                )}

                <Link href={`/shop/${id}`} className="block h-full w-full">
                    <img
                        className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${isOutOfStock ? 'opacity-50 grayscale' : ''}`}
                        src={image}
                        alt={title}
                    />
                </Link>

                <div className="absolute inset-x-4 bottom-4 z-20 opacity-0 transition-all duration-300 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                    <button
                        onClick={handleQuickAdd}
                        disabled={isAdding || isOutOfStock}
                        className="w-full bg-black text-white border border-primary font-bold py-3 rounded-lg shadow-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <span className="material-symbols-outlined text-lg">{isAdding ? 'hourglass_empty' : 'add_shopping_cart'}</span>
                        {isAdding ? 'Adding...' : isOutOfStock ? 'Sold Out' : 'Quick Add'}
                    </button>
                </div>

                <div className="absolute top-3 right-3 z-20 transition-all opacity-0 group-hover:opacity-100">
                    <WishlistButton
                        productId={id}
                        initialIsWishlisted={initialIsWishlisted}
                        className="bg-white/20 backdrop-blur-md border border-white/20 hover:bg-black hover:border-primary text-white"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <Link href={`/shop/${id}`}>
                    <h3 className="text-base font-bold leading-tight group-hover:text-primary transition-colors cursor-pointer text-black dark:text-white">
                        {title}
                    </h3>
                </Link>
                <div className="flex items-center justify-between">
                    <p className="text-gray-500 text-sm">{category || 'Unisex'}</p>
                    <div className="flex gap-2 items-center">
                        {oldPrice && <span className="text-sm text-gray-400 line-through">{oldPrice}</span>}
                        <p className={`font-bold text-lg ${oldPrice ? 'text-red-500' : 'text-black dark:text-white'}`}>
                            {typeof price === 'number' ? `$${price.toFixed(2)}` : price}
                        </p>
                    </div>
                </div>
                {colors && (
                    <div className="flex gap-1 pt-1">
                        {colors.map((color, index) => (
                            <div key={index} className="size-3 rounded-full border border-gray-300" style={{ backgroundColor: color }}></div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
