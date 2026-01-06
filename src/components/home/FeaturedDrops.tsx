import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MOCK_DROPS = [
    {
        id: '1',
        title: 'ACID WASH TEE',
        price: '$45.00',
        status: 'LOW STOCK',
        image: 'bg-zinc-800' // Placeholder class
    },
    {
        id: '2',
        title: 'NOISE HOODIE',
        price: '$85.00',
        status: 'AVAILABLE',
        image: 'bg-zinc-900'
    },
    {
        id: '3',
        title: 'GLITCH BEANIE',
        price: '$30.00',
        status: 'SOLD OUT',
        image: 'bg-zinc-800'
    }
];

export function FeaturedDrops() {
    return (
        <section className="container py-20 px-4 md:px-6">
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-4xl font-bold uppercase tracking-tight">Latest Drops</h2>
                <Link href="/shop" className="text-primary hover:underline underline-offset-4 font-mono">
                    View All -&gt;
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {MOCK_DROPS.map((product) => (
                    <Card key={product.id} className="group overflow-hidden border-border bg-card/50 hover:bg-card transition-colors">
                        <div className={`aspect-square w-full ${product.image} flex items-center justify-center text-muted-foreground font-mono text-sm relative`}>
                            {/* Mock Image Placeholder */}
                            <span>[PRODUCT_IMG]</span>
                            {product.status !== 'AVAILABLE' && (
                                <div className="absolute top-2 right-2 bg-background border border-border px-2 py-1 text-xs font-bold uppercase tracking-wider">
                                    {product.status}
                                </div>
                            )}
                        </div>
                        <CardHeader>
                            <CardTitle className="leading-none text-xl uppercase">{product.title}</CardTitle>
                        </CardHeader>
                        <CardFooter className="flex justify-between items-center">
                            <span className="font-mono font-bold text-lg text-primary">{product.price}</span>
                            <Button size="sm" variant={product.status === 'SOLD OUT' ? 'ghost' : 'secondary'} disabled={product.status === 'SOLD OUT'}>
                                {product.status === 'SOLD OUT' ? 'Gone' : 'Add to Cart'}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
}
