export function StitchNewsletter() {
    return (
        <section className="w-full bg-gradient-to-br from-black via-[#002db3] to-black py-16 text-white relative overflow-hidden">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/5 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
            <div className="mx-auto max-w-[1280px] px-4 text-center sm:px-6 lg:px-8 relative z-10">
                <span className="material-symbols-outlined text-[48px] mb-4 text-white/80">local_activity</span>
                <h2 className="mb-4 text-3xl font-black tracking-tighter md:text-5xl">JOIN THE CROCKNEST CLUB</h2>
                <p className="mx-auto mb-8 max-w-2xl text-lg font-medium text-white/90">
                    Get early access to drops, exclusive discounts, and be the first to know about our pop-up events.
                </p>
                <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                    <input
                        className="flex-1 rounded-lg border border-primary bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:ring-2 focus:ring-primary outline-none"
                        placeholder="Enter your email"
                        required
                        type="email"
                    />
                    <button className="rounded-lg bg-white px-6 py-3 font-bold text-black transition-transform hover:scale-105" type="button">
                        Subscribe
                    </button>
                </form>
                <p className="mt-4 text-xs text-white/60">By subscribing you agree to our Terms & Privacy Policy.</p>
            </div>
        </section>
    );
}
