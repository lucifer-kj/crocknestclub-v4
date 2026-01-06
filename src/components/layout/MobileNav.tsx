import Link from 'next/link';
import { Home, ShoppingBag, Search, Menu } from 'lucide-react';
import { cn } from "@/lib/utils";

export function MobileNav() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur md:hidden supports-[backdrop-filter]:bg-background/60">
            <nav className="flex items-center justify-around h-16">
                <Link href="/" className="flex flex-col items-center justify-center w-full h-full space-y-1 text-muted-foreground hover:text-primary transition-colors">
                    <Home className="h-5 w-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
                </Link>
                <Link href="/shop" className="flex flex-col items-center justify-center w-full h-full space-y-1 text-muted-foreground hover:text-primary transition-colors">
                    <Search className="h-5 w-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Browse</span>
                </Link>
                <Link href="/cart" className="flex flex-col items-center justify-center w-full h-full space-y-1 text-muted-foreground hover:text-primary transition-colors">
                    <ShoppingBag className="h-5 w-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Cart</span>
                </Link>
                <Link href="/menu" className="flex flex-col items-center justify-center w-full h-full space-y-1 text-muted-foreground hover:text-primary transition-colors">
                    <Menu className="h-5 w-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Menu</span>
                </Link>
            </nav>
        </div>
    );
}
