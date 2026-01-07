export function StitchShopByVibe() {
    return (
        <>
            <div className="w-full py-8">
                <h2 className="text-center text-3xl font-black tracking-tighter text-text-main dark:text-white md:text-4xl">
                    SHOP BY VIBE
                </h2>
            </div>
            <section className="w-full pb-20">
                <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 h-auto md:h-[600px]">
                        <div className="group relative col-span-1 md:col-span-2 md:row-span-2 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                            <div
                                className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAzw27iFwffJbCPf172f857U_1o9ikBxBlqQh-W6mwDQkYOt_4BF4lv__7YboiWqbg9yoSrmfBb0cBBtYRR5Lsq49TUoTwiAcRzxjs-h2E46gecwY7qTUC7lFfWDvZgvPKee9YFsCt02DHEti7GOtg05j0fMWHV6ScmBK3r64wGiRJYPoXow2Qrrz3r5g7w0bmr3_zOQ2IoCizrjguSV4cjZgNZ6f4Zs3W-cnuccnnj-pE6jNuabFous220Vgf_CMQGYIQrWFqgirk")' }}
                            >
                            </div>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                                <h3 className="text-3xl font-black text-white md:text-5xl uppercase tracking-tighter">Streetwear<br />Essentials</h3>
                                <a href="#" className="mt-4 inline-flex items-center gap-2 text-white font-bold hover:text-primary transition-colors">
                                    Explore Collection <span className="material-symbols-outlined">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                        <div className="group relative col-span-1 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 h-[250px] md:h-auto">
                            <div
                                className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB76sJGZBxDYoDJW-u22u0scbBA--heafS0xKZibeRCDVjGfenFxWQ5iaTSsHCP84gC5yFSIrSaU6egM4xjZPZQdoC3j2qKf4O1Omzguo8vR2wW8n7kLNpJG0spfx80dj_6zJyEEM-3aSYOnPXcObz33CmsfoIchoDVvG_bP1K_e58TZXT5iZ2_pi6yKQnoG1jhA4xIAWeTWLKOAROnReA34yYlRv6FwWq4LJ1XoRAoTSG7Vy5zpSwqBQaFqAbdfEMB_UwSEdte9aI")' }}
                            >
                            </div>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-2xl font-black text-white uppercase">Accessories</h3>
                            </div>
                        </div>
                        <div className="group relative col-span-1 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 h-[250px] md:h-auto">
                            <div
                                className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYYmvb1IKKIfPEFZLBe9CeqJ3jXyFIig6jX3ZvQexTgqFK_1pCNDFYPceuXfZHrBZYjH04EnYHjeJid1nDhvQJK26gF4OiFrE8VqJWm0M0uE51Afg3s_1cfohywVUAVj0-37RJv8vPogZB9jBaGCeOqoJwE96OGOAWI96qp7s_QGnLs5P8sZo7NVVyjbJHF1J6ioIM623mmtSDxc6_OGYvQoPX6a3zo-FqdZqmgWNk1yFX9cZNtHPDeNWLoge3IQMPHdctrqfOd98")' }}
                            >
                            </div>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-2xl font-black text-white uppercase">Denim Lab</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
