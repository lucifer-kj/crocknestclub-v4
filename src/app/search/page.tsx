import Link from 'next/link';
import { SearchFiltersBar } from "@/components/search/SearchFiltersBar";
import { StitchProductCard } from "@/components/shop/StitchProductCard";

// Mock Data for Search
const SEARCH_RESULTS = [
    {
        id: "s1",
        title: "Cyber-Y2K Graphic Hoodie",
        category: "Oversized Fit",
        price: "$45.00",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgFJXAq4S54jHuOXmvrnlz0tacu9rtNeo5k3XKKHns8m4fc3GesocqlzJdFe0gG3cb19H8ETkDCN4HO9tgZ14bKUJxtIWD9dKJvYu7Y56_QWv7XVvKdahKDE7B7-KCc_jPxj_U8XijAEVDeixJf8mSXId0JT2L0dqmxDS6oJ8rOcnOpj9BaaNzM6DS8M9qudnfrYNUKL48OXBwogmeethPdlekpmOD-TuiOl1KCVmM4z7jBOWBzpfeqGhpqL96MXpOP5XBXmWxOac",
        tags: [],
        colors: ["#000", "#2563eb"]
    },
    {
        id: "s2",
        title: "Acid Wash Vintage Tee",
        category: "100% Cotton",
        price: "$28.00",
        oldPrice: "$35.00",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGGEjW-hoK361bgvkoG8kt8cM1SZHeLwWnJHS8_vfAO8kqUkuRKcHOkl_fgK4GzfF2MtD3BTPGgLMbtzRMRPEjricLEXkwMZpPUBHiclk-hETEZ6c_W_vq3tMbdQT2htJfdu69v1XMUZ2qEuMqlwe5T4JhUHXduVYt5BMys0aMcGHDUcpWAs8qOrQe82Mm1ZDgnKyA3kOb_bgcPFG_jx0jJF8WEy7qSmHuzby-uxdPkqTeWpUWFURoCFXKvcywGfziVTcU0Ie71xQ",
        tags: ["Sale"],
        colors: []
    },
    {
        id: "s3",
        title: "Electric Blue Joggers",
        category: "Unisex",
        price: "$35.00",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtuZv5Afzn7YcVLWVtH5vKJlptQbBa0ixdYq9StdgkyomhpnwAGvSEPOZqBfDi25iZ_cBCtFZXl6i6Mj5j1Sw7g3yRqyvNmL-AVhgmY0oNYoc-BSGuMafnppt2fNZ7b12Axwn-Pl09quW2eKPmCS43XmH46ruYQF5d9IvH-_EjSqQEJzqypC5oNSIqBXMOdUtaoyk6KdsQWZNIwto_wn1hSljH7Nki12JUIZ0p3qzt7_BLoZBIgsy96Wa0l9Tg8w75_OMyHoX3ncI",
        tags: [],
        colors: ["#2563eb"]
    },
    {
        id: "s4",
        title: "Distressed Denim Jacket",
        category: "Outerwear",
        price: "$55.00",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiMXtoJvPnrpwO_7iIYb_NBWr4doqi0iiQFSDcXMnqYc4zig84iEtHyHRQ6nefn_d4xtP9ZBi3KiT8QiQS8YabBoYz9SRa1_C_iIAgCdptY1Qvr3SyopadJSY1SJLhmjH11dBD-K5rX1KkYbuWNm0hkN5x5gX8Ob57t4ulyidLbgyCwCmQJcMjO5XclYSv8LaHKu3uycDiAMuJSLFuoLVj2_aLqvPd0aewbS07LFs1MK9vWVqmtP_cpEo86fTFN1yIsZHDNsLY8aE",
        tags: ["New"],
        colors: []
    }
];

export default function SearchPage() {
    return (
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
            <nav aria-label="Breadcrumb" className="flex mb-6 text-sm font-medium text-gray-500">
                <ol className="flex items-center space-x-2">
                    <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                    <li><span className="text-gray-300">/</span></li>
                    <li><span aria-current="page" className="text-black dark:text-white font-semibold">Search Results</span></li>
                </ol>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-black dark:text-white mb-2">
                        Results for '<span className="text-primary decoration-4 decoration-primary/20 underline-offset-4">Cyber-Y2K</span>'
                    </h1>
                    <p className="text-gray-500 font-medium">Showing {SEARCH_RESULTS.length} products</p>
                </div>
                <div className="hidden md:block relative">
                    <button className="flex items-center justify-between w-48 px-4 py-2 bg-white dark:bg-white/5 border border-primary/30 rounded-lg hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-black dark:text-white">
                        <span className="text-sm font-semibold">Sort by: Featured</span>
                        <span className="material-symbols-outlined text-gray-400">expand_more</span>
                    </button>
                </div>
            </div>

            <SearchFiltersBar />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12 mb-16">
                {SEARCH_RESULTS.map(product => (
                    <StitchProductCard key={product.id} {...product} />
                ))}
            </div>

            <div className="mt-16 flex justify-center mb-24">
                <button className="bg-gradient-to-r from-black to-[#1a1a1a] dark:from-white dark:to-gray-200 hover:from-primary hover:to-primary-dark dark:hover:from-primary dark:hover:to-primary text-white dark:text-black hover:text-white font-bold py-4 px-12 rounded-lg transition-all shadow-lg hover:shadow-glow transform hover:-translate-y-1">
                    Load More Products
                </button>
            </div>

            <div className="mt-24 pt-12 border-t border-gray-100 dark:border-white/10">
                <div className="flex flex-col items-center text-center mb-10 max-w-2xl mx-auto">
                    <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-gray-400 text-3xl">sentiment_satisfied</span>
                    </div>
                    <h2 className="text-2xl font-bold text-black dark:text-white mb-2">Not finding the vibe?</h2>
                    <p className="text-gray-500">Check out these trending collections that everyone is talking about.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "BEST SELLERS", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDufLTqzcQmaviiDFqwCJfgkcPNJfrguqmYs9QCQkQSwHIT7QjITNivd0p9xZWpWSXZLVQ99H4OSIsObY8wPP_0HgS-HIaH49WQc7NKkOx2E-FYtfaj_nagy01QedaDD0GCVFtOmkteUN7vXFdMwXvY2_F_GvUzFBrdIuTS26yqYdhyxTJwYIfNDvT9jYFWVW9ELvsmlZbzxxLzXtWOBtQthwZWYhH-FSv6Bq2ClwcfVsBw-IIvTnyasJU-8g_CzScu7c-OzTiACWo" },
                        { title: "ACCESSORIES", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDczGJDr_J55P2BqM8Xkm2etDq3nwPGWs4OhDwZDI2p6VeS1uzAUyEhnPnLxO1JtPHmh2YNTgXp-Q2ouUFPrQGWMKMpps2dFDmtUtMfrcxIUwK-mRoliiEoFAqzyvcFM7ICFtSItuG2sr8fw3_EU-xBKHcS0ZRx06naxu38evni6snVRLGsCWFSDFMFYHuFoiqMmQEUoPKewzQlIhCnQGduIWGX9xK8Td4IljT2KtIWtkOKqmAjznU6podDJwWg0F7yuTLlAhyS2wU" },
                        { title: "NEW ARRIVALS", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuxRGv7WaSHXiwtKdZp9pd3m4DQhn-yU5nXMl6hUZpt1OvGsztWGJEf06_fFNUEiZlDVyxm7QC966fqcSbFel_hf-agbzb6o3-7rYC3E8eJSu49BlUEwwfZTnncoOszr-AmoiRhVEtY1ZGEzKcQurXMplewcfiGlJhasNSe2k2RxX4raGJ-lFgjFpNyXWOIH9k3UBqL0KSTkT0sc6TnD-t_act0topWieW_Jjmkl0eFE5i_Euf7RAjElpi0gYGfkXQCBzZix_Hkzs" }
                    ].map((collection, idx) => (
                        <Link href="/collections" key={idx} className="relative h-48 rounded-lg overflow-hidden group cursor-pointer block">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url('${collection.img}')` }}
                            ></div>
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-primary/40 transition-colors"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-white text-2xl font-bold tracking-wider border-b-2 border-transparent group-hover:border-white transition-all pb-1">{collection.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
