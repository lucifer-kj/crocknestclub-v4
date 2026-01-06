import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
    id: string
    title: string
    price: string
    scarcityLevel: string
    image: string
}

export function ProductCard({ id, title, price, scarcityLevel, image }: ProductCardProps) {
    return (
        <Card className="group overflow-hidden border-border/50 bg-card transition-all hover:border-primary/50 hover:shadow-lg">
            <CardHeader className="p-0">
                <div className="aspect-square relative overflow-hidden bg-muted">
                    {/* Placeholder Image Logic - In production use next/image */}
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                    ) : (
                        <div className="flex bg-muted items-center justify-center w-full h-full text-muted-foreground">
                            No Image
                        </div>
                    )}

                    {scarcityLevel === "HIGH" && (
                        <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground animate-pulse shadow-md">
                            Limited
                        </Badge>
                    )}
                    {scarcityLevel === "MEDIUM" && (
                        <Badge variant="secondary" className="absolute top-2 right-2 shadow-sm">
                            Fast Moving
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <h3 className="text-lg font-bold uppercase tracking-tight line-clamp-1 group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-muted-foreground font-mono font-medium">{price}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button className="w-full font-bold uppercase tracking-wide" asChild>
                    <Link href={`/shop/${id}`}>View Drop</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
