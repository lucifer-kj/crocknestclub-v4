"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
    images: string[]
    title: string
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(images[0])

    return (
        <div className="flex flex-col gap-4">
            <div className="aspect-square w-full overflow-hidden border-2 border-black bg-muted">
                <img
                    src={selectedImage || `https://placehold.co/600x600/000000/FFFFFF/png?text=${encodeURIComponent(title)}`}
                    alt={title}
                    className="h-full w-full object-cover object-center"
                    onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/600x600/000000/FFFFFF/png?text=${encodeURIComponent(title)}`
                    }}
                />
            </div>
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(image)}
                            className={cn(
                                "aspect-square relative overflow-hidden border-2 border-transparent bg-muted transition-all hover:border-black",
                                selectedImage === image && "border-black"
                            )}
                        >
                            <img
                                src={image || `https://placehold.co/100x100/000000/FFFFFF/png?text=${encodeURIComponent(title)}`}
                                alt={`${title} ${index + 1}`}
                                className="h-full w-full object-cover object-center"
                                onError={(e) => {
                                    e.currentTarget.src = `https://placehold.co/100x100/000000/FFFFFF/png?text=${encodeURIComponent(title)}`
                                }}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
