import { StitchProductCard } from "@/components/shop/StitchProductCard";
import { SidebarFilters } from "@/components/shop/SidebarFilters";
import Link from 'next/link';

// Mock Data matching the Stitch UI
const PRODUCTS = [
    {
        id: "1",
        title: "Cyber Glitch Oversized Tee",
        category: "Heavyweight Cotton",
        price: "$45.00",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjXKwZhqweMyjS4Q2PXCZDC8RdVG6QP7UyNNt2S9oJNif8H5WS07wH4HKKEni0BxYbo4QkOWtJfVwfjXgvZnlw-Ee0gfZIJ-uMzTDgpRhV455ccPuxmW_l0U8PUh9SKFfknB9rAbib4CT3lHnklNc7VIVY_yHFkp_ZcYU_yqbpN03mbgae4nnx6-hOjDhOv145IhkgKIfeH20sGzQDUdEZSfaT-n6uVX6dXfJR2hIGgKnMH0PNTuxQcjyRte6Qik9vOd06ocMQQl8",
        tags: ["New"],
        colors: ["#000", "#7c3aed"]
    },
    {
        id: "2",
        title: "Neon Tokyo Hoodie",
        category: "Fleece Lined",
        price: "$89.00",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqm7dzKoRxlwVnsbKEpPdZD8YNlmopjk8M-NaAgQ7XcOdwtb2raqn2wmlTRdvm2tZbob0o01wKMDXSLvT59uuQbPulnpDk8Mrf1d8FSmSnbBD1WJHpnUxUR9pqde9BOG17md9sFbBHsFSgwh8BDk5KJodL6clDfICyyLOrtAA1LvaeqUly7up3IkzQrFHwrvMHUMBpEuKLOLM5D88o6NazoNY7kwRDgt5JNCL3txLQZX6M9a8mvtM-Ah3EyRrtldxA3a3nRNMp7Mw",
        tags: [],
        colors: ["#facc15", "#000"]
    },
    {
        id: "3",
        title: "Void Black Graphic Tee",
        category: "100% Cotton",
        price: "$29.00",
        oldPrice: "$45.00",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASaPH3iwx46x0RCjHAvVXSrGesXtKYQPqAKVWFH8iPU3fWQ6opGkSRrxJ9cE2qXi4YBO3PzQi-xhXMQCmA5GD_DmLBUoGE5Ru1IkInVGDJhfIFZIoyu_E0VhcRxlXZumPrwAOMZ_ttG2b9pUrbXwpLEal-BU5ehLCymyJW9NOgBc_DUbQJuSzN22pRvfhdkKt_ztIECJlFCxCNu9ibPK-hhsf4O9trcj2GL8Ot9PpP2_brXXyLUz93CFykL8qnPHgoXH3wbyvQrZY",
        tags: ["Sale"],
        colors: ["#000"]
    },
    {
        id: "4",
        title: "Retro Wave Crop",
        category: "Summer Collection",
        price: "$32.00",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_c0jbpywL9DVf34vsbE6UI0X9023XVO9jDAXnc4C94PC7dWmiVpHAPkrhkHHVbYI39seh0N65x1e0VBOiq6EBEmETm4ODZ16gC7d8VeoAmkr1nxl5hTpWEPZxgGIyKFM0zdPRjjseKCBKTVIBOJ4Z9J2xJV5GcJlcf5IZxZ2fYIuMDOfTogi0OOEaUKfenc5zijg1WreksBDVNkg5scsZduIN3LRPq8Mxyqu45qBp5FgJQxqpKeOLviL-juGcs6U6uTWaQIlAAdA",
        tags: [],
        colors: ["#f472b6", "#60a5fa"]
    },
    {
        id: "5",
        title: "Cargo Utility Vest",
        category: "Techwear Series",
        price: "$65.00",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD77jpqqnUhBigNS25Ad5FrLfjtnZVQFBu8AYePmKOJ8MXW7uZQddWqtGthyTjl3XLo4WOyKu89w72L67ptqp7i42cZTfun-Fa6YTSdWjQJSo1bp5mEETecMKMMeQiGL3fRzuoyeW6y5lFXBwwgqfErJL6L0piUdcTVfA3NcC0gHSC-VpbG_IV6_ZoY8MnwIOKKGtsAwnTjMpNLzUu9hNgrDKVT7klle8vowEutuGJBJQrSI7WbvIrNPV92pmiBLVoGh1-IE7dFFNA",
        tags: [],
        colors: ["#166534", "#000"]
    },
    {
        id: "6",
        title: "Minimalist Line Art Tee",
        category: "Organic Cotton",
        price: "$38.00",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGOzmwi29Uki6c731yTjllH8wCTSwSSOoCV4Ks3b8lHax12Rj86U9S9Hr2bLvb5KMa19M547KNlY9hxWS6JMEikO987O_QTILuxpPeth5ZaAjMxEmkTMbmh9hD3v1DU5X3DYr_3veChj1fWcT3ZFCSEMMRIL_Uq1LdxTSzgm7BPBq8nYObOYr8PQUeWsrMiEclH7sjKlDIhael_erf6tPPKaIRpnHP3bIEKBEIysekWeT8I5kwpWRdDymhq8_eeOrPIrbrD3XL830",
        tags: [],
        colors: ["#fff"]
    }
];

export default function ShopPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="px-4 md:px-8 lg:px-12 py-6">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                    <Link href="/" className="text-gray-500 hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-[10px] text-primary">arrow_forward_ios</span>
                    <span className="text-black dark:text-white font-semibold">Streetwear Drops</span>
                </div>
            </div>

            <div className="px-4 md:px-8 lg:px-12 pb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 uppercase italic">Streetwear <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Drops</span></h1>
                        <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl font-medium leading-relaxed">Fresh prints for the new wave. Bold aesthetic designs for a generation that refuses to blend in.</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row px-4 md:px-8 lg:px-12 pb-20 gap-10">
                <SidebarFilters />

                <main className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <p className="text-gray-500 font-medium">Showing <span className="text-black dark:text-white font-bold">{PRODUCTS.length}</span> results</p>
                        <div className="flex items-center gap-3">
                            <label className="hidden sm:block text-sm font-medium text-gray-500">Sort by:</label>
                            <div className="relative">
                                <select className="appearance-none bg-white dark:bg-white/5 border border-primary rounded-lg py-2.5 pl-4 pr-10 text-sm font-bold focus:ring-2 focus:ring-primary cursor-pointer hover:bg-gray-50 transition-colors shadow-sm text-black dark:text-white">
                                    <option>Newest Drops</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Best Selling</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-primary pointer-events-none text-xl">expand_more</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                        {PRODUCTS.map(product => (
                            <StitchProductCard key={product.id} {...product} />
                        ))}
                    </div>

                    <div className="flex flex-col items-center justify-center mt-16 gap-4">
                        <p className="text-gray-500 text-sm">Showing {PRODUCTS.length} of {PRODUCTS.length} Products</p>
                        <div className="w-64 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-primary rounded-full"></div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
