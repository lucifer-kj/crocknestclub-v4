import Link from 'next/link';
import { StitchNewsletter } from "@/components/home/StitchNewsletter";

const COLLECTIONS = [
    {
        title: "Streetwear Essentials",
        desc: "The foundation of your fit. Hoodies, tees, and cargos.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzw27iFwffJbCPf172f857U_1o9ikBxBlqQh-W6mwDQkYOt_4BF4lv__7YboiWqbg9yoSrmfBb0cBBtYRR5Lsq49TUoTwiAcRzxjs-h2E46gecwY7qTUC7lFfWDvZgvPKee9YFsCt02DHEti7GOtg05j0fMWHV6ScmBK3r64wGiRJYPoXow2Qrrz3r5g7w0bmr3_zOQ2IoCizrjguSV4cjZgNZ6f4Zs3W-cnuccnnj-pE6jNuabFous220Vgf_CMQGYIQrWFqgirk",
        size: "large"
    },
    {
        title: "Cyber-Y2K",
        desc: "Retro-futuristic aesthetic for the digital age.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfqfMR-ZMpbPB2LeGKbBFMi79wMsJ9-9aiuCbnXznC-A-tnt-JMasc_F8-x8VjAKCX5WlC_GRT3DkP_Fess0bboB23Jn9sFfwaGyYsUovB-fYku72Wb9BfLCFduDnjK_kpHgY_NbdqENdOsiSPQwOZT4fGMPy-RLWMUCArewCE1B3rtcR9Jo6LBmXnggetasoytE5NUZ_o9i7-SthgjgQqwFZQsKfp4Ki4R-iUQ10JL5mcMCovUh4dQ9zA1VtmXH_pg3jpvqAMfaI",
        size: "small"
    },
    {
        title: "Denim Lab",
        desc: "Distressed, washed, and reconstructed denim.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYYmvb1IKKIfPEFZLBe9CeqJ3jXyFIig6jX3ZvQexTgqFK_1pCNDFYPceuXfZHrBZYjH04EnYHjeJid1nDhvQJK26gF4OiFrE8VqJWm0M0uE51Afg3s_1cfohywVUAVj0-37RJv8vPogZB9jBaGCeOqoJwE96OGOAWI96qp7s_QGnLs5P8sZo7NVVyjbJHF1J6ioIM623mmtSDxc6_OGYvQoPX6a3zo-FqdZqmgWNk1yFX9cZNtHPDeNWLoge3IQMPHdctrqfOd98",
        size: "small"
    },
    {
        title: "Techwear",
        desc: "Utility focused gear with a dark edge.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD77jpqqnUhBigNS25Ad5FrLfjtnZVQFBu8AYePmKOJ8MXW7uZQddWqtGthyTjl3XLo4WOyKu89w72L67ptqp7i42cZTfun-Fa6YTSdWjQJSo1bp5mEETecMKMMeQiGL3fRzuoyeW6y5lFXBwwgqfErJL6L0piUdcTVfA3NcC0gHSC-VpbG_IV6_ZoY8MnwIOKKGtsAwnTjMpNLzUu9hNgrDKVT7klle8vowEutuGJBJQrSI7WbvIrNPV92pmiBLVoGh1-IE7dFFNA",
        size: "small"
    },
    {
        title: "Accessories",
        desc: "The finishing touches. Bags, jewelry, and headwear.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB76sJGZBxDYoDJW-u22u0scbBA--heafS0xKZibeRCDVjGfenFxWQ5iaTSsHCP84gC5yFSIrSaU6egM4xjZPZQdoC3j2qKf4O1Omzguo8vR2wW8n7kLNpJG0spfx80dj_6zJyEEM-3aSYOnPXcObz33CmsfoIchoDVvG_bP1K_e58TZXT5iZ2_pi6yKQnoG1jhA4xIAWeTWLKOAROnReA34yYlRv6FwWq4LJ1XoRAoTSG7Vy5zpSwqBQaFqAbdfEMB_UwSEdte9aI",
        size: "large"
    }
];

const getSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-');
};

export default function CollectionsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-black text-white py-20 px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">OUR COLLECTIONS</h1>
                <p className="max-w-xl mx-auto text-gray-400 text-lg">Curated vibes for every aesthetic. Explore the latest drops and timeless essentials.</p>
            </div>

            <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {COLLECTIONS.map((col, idx) => (
                        <Link
                            href={`/collections/${getSlug(col.title)}`}
                            key={idx}
                            className={`group relative overflow-hidden rounded-2xl block ${col.size === 'large' ? 'md:col-span-2 aspect-[21/9]' : 'col-span-1 aspect-[4/3]'} bg-gray-100 dark:bg-gray-800`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url('${col.img}')` }}
                            ></div>
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2 uppercase">{col.title}</h2>
                                <p className="text-white/80 font-medium text-lg max-w-md translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    {col.desc}
                                </p>
                                <span className="mt-6 inline-flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-primary hover:text-white transition-colors translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500 delay-100">
                                    Explore <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <StitchNewsletter />
        </div>
    );
}
