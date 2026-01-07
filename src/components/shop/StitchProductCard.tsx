import Link from 'next/link';

interface ProductCardProps {
    id: string;
    title: string;
    price: string;
    oldPrice?: string;
    image: string;
    category?: string;
    tags?: string[];
    colors?: string[];
}

export function StitchProductCard({ id, title, price, oldPrice, image, category, tags, colors }: ProductCardProps) {
    return (
        <div className="group product-card flex flex-col gap-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-50 dark:bg-white/5 border border-primary/30 hover:border-primary transition-colors duration-300">
                {tags && tags.length > 0 && (
                    <span className="absolute top-3 left-3 z-20 bg-black text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded border border-primary">
                        {tags[0]}
                    </span>
                )}
                <Link href={`/shop/${id}`} className="block h-full w-full">
                    <img
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        src={image}
                        alt={title}
                    />
                </Link>

                <div className="absolute inset-x-4 bottom-4 z-20 opacity-0 transition-all duration-300 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                    <button className="w-full bg-black text-white border border-primary font-bold py-3 rounded-lg shadow-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                        Quick Add
                    </button>
                </div>

                <button className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm border border-transparent text-white hover:bg-black hover:border-primary hover:text-white transition-all opacity-0 group-hover:opacity-100">
                    <span className="material-symbols-outlined text-lg">favorite</span>
                </button>
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
                        <p className={`font-bold text-lg ${oldPrice ? 'text-red-500' : 'text-black dark:text-white'}`}>{price}</p>
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
