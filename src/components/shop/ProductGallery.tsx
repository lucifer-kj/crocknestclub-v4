
interface ProductGalleryProps {
    images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
    return (
        <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-surface-dark border border-primary/20">
                <img
                    src={images[0]}
                    alt="Product Main"
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-primary/50">Bestseller</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {images.slice(1, 3).map((img, idx) => (
                    <div key={idx} className="aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-surface-dark border border-primary/20 hover:border-primary transition-colors">
                        <img
                            src={img}
                            alt={`Detail ${idx}`}
                            className="h-full w-full object-cover transition-opacity hover:opacity-80 cursor-pointer"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
