import Link from 'next/link';
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-background text-center px-4">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50 pointer-events-none" />

            <h1 className="relative z-10 text-6xl md:text-9xl font-black uppercase tracking-tighter text-foreground mb-6 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">CROCKNESTCLUB</span>
            </h1>

            <p className="relative z-10 max-w-[600px] text-lg md:text-2xl text-muted-foreground mb-10 font-mono">
                Limited Drops. Finite Stock. No Restocks.
                <br />
                <span className="text-secondary font-bold">Drop #01 is LIVE.</span>
            </p>

            <div className="relative z-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 h-14 font-bold uppercase tracking-wide" asChild>
                    <Link href="/shop">Shop The Drop</Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 h-14 font-bold uppercase tracking-wide" asChild>
                    <Link href="/about">Our Manifesto</Link>
                </Button>
            </div>
        </section>
    );
}
