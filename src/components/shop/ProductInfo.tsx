"use client";

import { useState } from "react";
import { useCart } from "@/store/cart-context";

interface ProductInfoProps {
    id: string;
    title: string;
    price: string;
    image: string;
    oldPrice?: string;
    description: string;
}

export function ProductInfo({ id, title, price, image, oldPrice, description }: ProductInfoProps) {
    const [qty, setQty] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart({
            productId: id,
            variantId: `${id}-${selectedSize}-Default`,
            title: title,
            price: parseFloat(price.replace(/[^0-9.]/g, '')),
            image: image,
            size: selectedSize,
            color: "Default",
            quantity: qty
        });

        setTimeout(() => setIsAdding(false), 500);
    };

    return (
        <div className="lg:col-span-5 relative">
            <div className="sticky top-24 flex flex-col gap-6">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-primary font-bold text-sm tracking-wide uppercase">New Season Drop</span>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-yellow-400 text-[18px] fill-current">star</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">4.8</span>
                            <a href="#reviews" className="text-sm text-slate-500 underline decoration-slate-300 underline-offset-2 hover:text-primary transition-colors">(120 reviews)</a>
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
                        {title}
                    </h1>
                    <div className="flex items-end gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                        <span className="text-3xl font-bold text-primary">{price}</span>
                        {oldPrice && <span className="text-lg text-slate-400 line-through mb-1">{oldPrice}</span>}
                        {oldPrice && <span className="mb-1.5 ml-auto text-green-500 text-sm font-bold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded border border-green-200 dark:border-green-800">Save 25%</span>}
                    </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {description}
                </p>

                <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Color: <span className="text-slate-500 font-normal">Electric Blue</span></h3>
                    <div className="flex flex-wrap gap-3">
                        <button aria-label="Blue" className="w-10 h-10 rounded-full bg-[#0055ff] ring-2 ring-offset-2 ring-primary ring-offset-background-light dark:ring-offset-background-dark focus:outline-none"></button>
                        <button aria-label="Black" className="w-10 h-10 rounded-full bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 hover:ring-primary focus:outline-none"></button>
                        <button aria-label="White" className="w-10 h-10 rounded-full bg-white border border-slate-200 ring-1 ring-transparent hover:ring-primary focus:outline-none"></button>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Size: <span className="text-slate-500 font-normal">{selectedSize}</span></h3>
                        <button className="text-xs font-bold text-primary hover:underline">Size Guide</button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {['S', 'M', 'L', 'XL'].map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`h-12 rounded-lg font-bold text-sm transition-all border ${selectedSize === size
                                    ? 'bg-black dark:bg-white text-white dark:text-black ring-2 ring-primary border-primary shadow-md'
                                    : 'bg-white dark:bg-surface-dark text-slate-900 dark:text-white border-primary/40 hover:border-primary hover:text-primary'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-3 mt-2">
                    <div className="flex gap-4">
                        <div className="w-32 flex items-center justify-between px-3 h-14 rounded-xl bg-white dark:bg-surface-dark border border-primary/30">
                            <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-1 hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">remove</span></button>
                            <span className="font-bold text-slate-900 dark:text-white">{qty}</span>
                            <button onClick={() => setQty(qty + 1)} className="p-1 hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">add</span></button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            disabled={isAdding}
                            className="flex-1 h-14 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group border border-primary disabled:opacity-75 disabled:cursor-not-allowed">
                            <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
                            {!isAdding && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>}
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs text-slate-500 mt-2">
                        <div className="flex items-center gap-2 justify-center py-2 bg-slate-50/50 dark:bg-surface-dark rounded-lg border border-primary/20">
                            <span className="material-symbols-outlined text-[18px] text-primary">local_shipping</span>
                            Free shipping over $100
                        </div>
                        <div className="flex items-center gap-2 justify-center py-2 bg-slate-50/50 dark:bg-surface-dark rounded-lg border border-primary/20">
                            <span className="material-symbols-outlined text-[18px] text-primary">verified</span>
                            30-day easy returns
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 mt-6 pt-2">
                    <details className="group py-4 border-b border-slate-200 dark:border-slate-800 cursor-pointer">
                        <summary className="flex justify-between items-center font-bold text-slate-900 dark:text-white list-none hover:text-primary transition-colors">
                            Product Features
                            <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-primary">expand_more</span>
                        </summary>
                        <div className="pt-4 text-sm text-slate-600 dark:text-slate-400 space-y-2 pl-4 border-l-2 border-primary/30 ml-1">
                            <p>• 100% Organic Cotton French Terry</p>
                            <p>• 450 GSM Heavyweight Fabric</p>
                            <p>• Pre-shrunk to minimize shrinkage</p>
                            <p>• High-density puff print graphics</p>
                        </div>
                    </details>
                </div>
            </div>
        </div>
    );
}
