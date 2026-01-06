import Link from 'next/link';
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center px-4 md:px-6">
                <Link href="/" className="mr-8 font-bold text-xl uppercase tracking-tighter">
                    CROCKNESTCLUB
                </Link>
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link href="/shop" className="transition-colors hover:text-foreground/80 text-foreground/60">Shop</Link>
                    <Link href="/drops" className="transition-colors hover:text-foreground/80 text-foreground/60">Drops</Link>
                </nav>
                <div className="ml-auto flex items-center space-x-4">
                    <Button variant="outline" size="sm">Cart (0)</Button>
                </div>
            </div>
        </header>
    );
}
