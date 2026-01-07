import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { CartButton } from "@/components/cart/CartButton";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { User } from 'lucide-react';

export function Header() {
    return (
        <>
            <CartDrawer />
            <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
                <div className="container flex h-16 items-center px-4 md:px-6">
                    <Link href="/" className="mr-8 font-black text-2xl uppercase tracking-tighter hover:text-primary transition-colors">
                        CROCKNEST<span className="text-primary">CLUB</span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest">
                        <Link href="/shop" className="transition-colors hover:text-primary hover:underline decoration-2 underline-offset-4">Shop</Link>
                        <Link href="/shop?category=apparel" className="transition-colors hover:text-primary hover:underline decoration-2 underline-offset-4">Apparel</Link>
                        <Link href="/shop?category=digital" className="transition-colors hover:text-primary hover:underline decoration-2 underline-offset-4">Digital</Link>
                    </nav>
                    <div className="ml-auto flex items-center space-x-4">
                        <Button variant="ghost" size="icon" asChild className="hover:text-primary hover:bg-transparent">
                            <Link href="/account">
                                <User className="h-6 w-6 stroke-[2px]" />
                                <span className="sr-only">Account</span>
                            </Link>
                        </Button>
                        <CartButton />
                    </div>
                </div>
            </header>
        </>
    );
}
