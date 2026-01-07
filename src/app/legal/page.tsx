export default function LegalHubPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-secondary dark:text-white">
            <main className="flex-grow flex flex-col items-center w-full">
                {/* Hero Section */}
                <section className="w-full relative overflow-hidden bg-secondary dark:bg-black">
                    {/* Abstract Background Pattern */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-primary/40"></div>
                    <div className="relative px-4 py-16 md:py-24 max-w-[1280px] mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="flex flex-col gap-6 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 w-fit">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                <span className="text-primary-foreground text-xs font-bold text-white uppercase tracking-wider">Legal Hub</span>
                            </div>
                            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tighter">
                                Transparency is our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#4D4DFF]">Style.</span>
                            </h1>
                            <p className="text-gray-300 text-lg md:text-xl font-normal leading-relaxed max-w-lg">
                                Everything you need to know about shopping with CrockNestClub. Clear, concise, and just a click away.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <button className="px-6 h-12 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(17,17,212,0.5)]">
                                    Browse Policies
                                </button>
                                <button className="px-6 h-12 rounded-lg border border-white/20 hover:bg-white/10 text-white font-bold transition-colors">
                                    Contact Support
                                </button>
                            </div>
                        </div>
                        {/* Decorative Graphic Element */}
                        <div className="hidden md:block w-full max-w-xs lg:max-w-md relative">
                            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary to-black p-1 rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                                <div className="h-full w-full bg-background-light dark:bg-background-dark rounded-xl flex items-center justify-center overflow-hidden relative">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
                                    <span className="material-symbols-outlined text-9xl text-primary opacity-20 transform -rotate-12">gavel</span>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="h-2 w-1/2 bg-gray-200 rounded mb-2"></div>
                                        <div className="h-2 w-3/4 bg-gray-200 rounded mb-2"></div>
                                        <div className="h-2 w-full bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Feature Section / Policy Directory */}
                <section className="w-full px-4 py-16 md:py-24 bg-background-light dark:bg-background-dark">
                    <div className="max-w-[1280px] mx-auto w-full">
                        <div className="flex flex-col gap-4 mb-12 text-center md:text-left">
                            <h2 className="text-secondary dark:text-white text-3xl md:text-4xl font-black tracking-tight">
                                Policy Directory
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl">
                                Access our full legal documentation below. We believe in transparency and bold style.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: 'description', title: 'Terms of Service', text: 'The rules of the game. Understand your rights and responsibilities when using our platform.' },
                                { icon: 'verified_user', title: 'Privacy Policy', text: 'How we protect your data. We respect your privacy and your style above all else.' },
                                { icon: 'local_shipping', title: 'Shipping & Delivery', text: 'From our nest to your door. Learn about timelines, costs, and tracking info.' },
                                { icon: 'assignment_return', title: 'Returns & Exchanges', text: 'Not the right fit? Find out how to initiate a return or exchange quickly and easily.' }
                            ].map((policy, index) => (
                                <a key={index} href="#" className="group relative flex flex-col gap-4 p-6 rounded-xl border border-gray-200 hover:border-primary bg-white dark:bg-white/5 dark:border-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                                    <div className="w-12 h-12 rounded-lg bg-gray-50 dark:bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                        <span className="material-symbols-outlined text-2xl">{policy.icon}</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-lg font-bold text-secondary dark:text-white group-hover:text-primary transition-colors">{policy.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{policy.text}</p>
                                    </div>
                                    <div className="mt-auto pt-4 flex items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                                        Read Policy <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ / Accordions */}
                <section className="w-full px-4 py-16 bg-[#f8f8fc] dark:bg-white/5 border-y border-gray-200 dark:border-white/10">
                    <div className="max-w-3xl mx-auto w-full flex flex-col gap-8">
                        <div className="text-center mb-4">
                            <h2 className="text-2xl md:text-3xl font-black text-secondary dark:text-white">Common Questions</h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">Quick answers to the most frequent legal inquiries.</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            {[
                                { q: 'How do I return an item?', a: 'You can return any unworn item within 30 days of purchase. Visit our Returns portal to generate a shipping label. Items must be in original condition with tags attached.' },
                                { q: 'Do you ship internationally?', a: 'Yes, we ship to over 50 countries worldwide! International shipping rates vary by zone and weight. Customs duties may apply depending on your country\'s regulations.' },
                                { q: 'How is my payment data secured?', a: 'We use industry-standard encryption and adhere to strict PCI-DSS compliance. Your payment information is tokenized and never stored directly on our servers.' },
                                { q: 'How do I contact the legal team?', a: 'For specific legal inquiries not covered here, please email us directly at legal@crocknestclub.com.' }
                            ].map((faq, index) => (
                                <details key={index} className="group rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-white/10 open:border-primary/50 overflow-hidden transition-all duration-300">
                                    <summary className="flex cursor-pointer items-center justify-between gap-6 p-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                        <h3 className="text-base font-bold text-secondary dark:text-white group-open:text-primary">{faq.q}</h3>
                                        <span className="material-symbols-outlined text-gray-400 group-open:rotate-180 group-open:text-primary transition-transform duration-300">expand_more</span>
                                    </summary>
                                    <div className="px-5 pb-5 text-gray-600 dark:text-gray-300 text-sm leading-relaxed border-t border-transparent group-open:border-gray-100 dark:group-open:border-white/10 pt-4">
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="w-full relative px-4 py-20 bg-secondary dark:bg-black overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"></div>
                    <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
                        <div className="space-y-4">
                            <h2 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight">
                                Still have questions?
                            </h2>
                            <p className="text-gray-300 text-lg font-normal max-w-xl mx-auto">
                                Our legal team is here to help clarify any doubts. Don't hesitate to reach out if you need further assistance.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <button className="flex items-center justify-center gap-2 px-8 h-12 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(17,17,212,0.4)]">
                                <span className="material-symbols-outlined text-[20px]">mail</span>
                                Email Legal Team
                            </button>
                            <button className="flex items-center justify-center gap-2 px-8 h-12 bg-transparent border border-white/30 text-white rounded-lg font-bold hover:bg-white/10 transition-colors">
                                <span className="material-symbols-outlined text-[20px]">chat</span>
                                Start Live Chat
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
