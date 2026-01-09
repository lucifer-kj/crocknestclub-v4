import { DropsCountdown } from "./_components/DropsCountdown"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DropsPage() {
    return (
        <div className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden bg-black text-white flex flex-col items-center justify-center text-center">
            {/* Background Video/Image (Placeholder) */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                    alt="Background"
                    className="w-full h-full object-cover opacity-40 blur-sm scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            <div className="relative z-10 px-4 max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-1000">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/50 bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase mb-4">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Incoming Drop
                </div>

                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">
                    NEON <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">WASTELAND</span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
                    The wait is almost over. Our most requested cyber-aesthetic collection drops globally. Limited quantities. No restocks.
                </p>

                <DropsCountdown />

                <div className="pt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button size="lg" className="h-14 px-8 text-lg font-black uppercase tracking-wide bg-primary hover:bg-primary-dark text-black rounded-full xl-shadow transition-all hover:scale-105">
                        <span className="material-symbols-outlined mr-2">notifications_active</span>
                        Notify Me
                    </Button>
                    <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-bold uppercase tracking-wide border-white/20 hover:bg-white/10 text-white rounded-full transition-all" asChild>
                        <Link href="/shop">View Current Collection</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
