import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductInfo } from "@/components/shop/ProductInfo";
import Link from 'next/link';

// Mock Data for Detail Page (consistent with listing)
const MOCK_PRODUCT = {
    title: "Neon Cyber-Punk Hoodie",
    price: "$65.00",
    oldPrice: "$85.00",
    description: "Step into the future with our heavyweight cotton fleece hoodie. Featuring a relaxed, boxy fit and high-density neon puff prints that glow under UV light. Perfect for late night city runs or gaming marathons.",
    images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDfqfMR-ZMpbPB2LeGKbBFMi79wMsJ9-9aiuCbnXznC-A-tnt-JMasc_F8-x8VjAKCX5WlC_GRT3DkP_Fess0bboB23Jn9sFfwaGyYsUovB-fYku72Wb9BfLCFduDnjK_kpHgY_NbdqENdOsiSPQwOZT4fGMPy-RLWMUCArewCE1B3rtcR9Jo6LBmXnggetasoytE5NUZ_o9i7-SthgjgQqwFZQsKfp4Ki4R-iUQ10JL5mcMCovUh4dQ9zA1VtmXH_pg3jpvqAMfaI",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCDK-JV_ebTLraRxMU1Fdvq34oEPI6CE82Nu3HvvmB1Vvog1b0h4ItPACvBvKZWct6R5BBxXMpezC8RJtZtmbzff1S0501CyLfxleXMCSEjfUyIrrAjDqg2MxCXvaUOckyMfKvZ_Jr-uVC-vMExdZVLVG9l7PqqFP1rcx300xmfFTD1oHwjIAiV2zP52NyDsP8jgl8Ay5PCtkKqQ3-IZr_nFstSxl4GnL_syJPPBEaODLD-ocw_2wRemNj_auhLrMBPpuKaSsYK0tM",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB_2gwlT82yZCt_L4SFLU03-H-5vzfiqvhGBEE9HeWAyC85mbP5AV9qjWRd7HmxKwxP0rMC6J8RB4FtawxGHoBHRNe07RA-hSet_sECP1LQamCFWj3PYRui_q-yShfOv6VmpaTDWeOHWYLXSbkFCudva5D5cnAfK7hU65itR7rA8gd9GN3cQ002kfuUEf1n5PvN-hE8CzCnkhem3EAIZJ57y0XGhs4fSaCcFIGRjschETdWo712JzEEU44ijtaIiLX-X__PK-P3Jf8"
    ]
};

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
    return (
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-6">
            <nav className="flex mb-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
                <span className="mx-2">/</span>
                <span className="text-black dark:text-white">{MOCK_PRODUCT.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
                <ProductGallery images={MOCK_PRODUCT.images} />
                <ProductInfo
                    title={MOCK_PRODUCT.title}
                    price={MOCK_PRODUCT.price}
                    oldPrice={MOCK_PRODUCT.oldPrice}
                    description={MOCK_PRODUCT.description}
                />
            </div>
        </div>
    );
}
