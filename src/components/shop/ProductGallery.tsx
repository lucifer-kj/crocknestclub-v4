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
            <div className="aspect-square w-full overflow-hidden rounded-lg border bg-muted">
                {selectedImage ? (
                    <img
                        src={selectedImage}
                        alt={title}
                        className="h-full w-full object-cover object-center"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">No Image</div>
                )}
            </div>
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(image)}
                            className={cn(
                                "aspect-square relative overflow-hidden rounded-md border bg-muted transition-all hover:ring-2 hover:ring-primary",
                                selectedImage === image && "ring-2 ring-primary"
                            )}
                        >
                            <img
                                src={image}
                                alt={`${title} ${index + 1}`}
                                className="h-full w-full object-cover object-center"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
