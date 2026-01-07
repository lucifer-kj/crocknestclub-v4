
const TRENDING_ITEMS = [
    {
        id: 1,
        title: "Acid Wash Tee",
        desc: "Unisex / Cotton",
        price: "$35.00",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDK8eW-yXgi96Dm8p-9pskEPPC9pCyiIkjmlS-caVC_rqYQd0P7zouQz-iWDuKvKH8UQfKYT_S58Q776eVE24RuokCCCOA2UAm3JsTk78wXZNNj2-CAXhBwhEfjJBC_9KF-sEP3qhm5qJKXEUSuxSehNSsIFwIx-yN_PvZvPrjJU8jkMOgSFwQLbLpF7A-RHCDTU9Lnz2WDRCjCixzIIIqV1tsErzqyNxn0YgMKWWTgpXpAN2WpIoHNOb51jrsvAl5nA-VDM-WQi3Y",
        tag: null
    },
    {
        id: 2,
        title: "Cyber Punk Hoodie",
        desc: "Heavyweight",
        price: "$55.00",
        oldPrice: "$65.00",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4uSYrR3gzwTPUD2qh6cfebEktFTHfjLyBc_79AUbkzgHe2cdbN9_XU9zFpyt3mWyYQ8DUqNj5hHa2_S05tQAoMjH1910m-Zk_jOllQIXQnW3l9_TeTD23G4yLK0hueJw4kl9dvUla7m42DwGk2cFmw6pYKz7WjZ_NSnz6Dq4mJwlZDuFYzCNz38UXcrxaOfK8kCfQYSWlTskIPji8ptYk5gHbM08-bgxh0R9bFFJqnQGRqWaBYHW7I8Ty7UBMZ6AuXS14RX1jgG0",
        tag: "Sale"
    },
    {
        id: 3,
        title: "Wide Leg Cargo",
        desc: "Denim",
        price: "$48.00",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPxJMUihrlKejRMFtvBZg6jFjA5c8VisZ0nm1mn0KnY4Y9jeZHZTLnns9EQsdGai6PdnR6pT31p2Fabuq57ARSFV6kmH4gi_6uB9hwhGnbBc3oZk5TixemtiJ0yFnVkfStW6zgLuXijVrV9C0GMamIjTfe2ET29lwe0BZZiNfi_6My50E-3YZ3VmHGbkG5JQJFFuLNlHf_FWrTDVbHV5vNbHkMNT3KZHhbgs98fxVEF-XoKX5XcBiCEU_wKFs7qzy98ASUB2yw078",
        tag: null
    },
    {
        id: 4,
        title: "Graphic Crop",
        desc: "Summer Fit",
        price: "$28.00",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCanU2F0y9GWGOFO8w6iRDD3rs8eScEagDX-jiGJ6_oQVVZaX_Ex9y3jwKLTLDAgYBiI3XVVS_MJn3g5bi1jjyVn63FX9nroFBS6zd7ABc4y4sOHz8uzk5daSkJDhNvdCjR4UkK0b4mFaZEqvIKOUZb8eFbPXXqHST5Knfnf_L12nonNyc3KlF9pqoFsR5psC1BUIYrjUv1saVq-LUjsyXA2QLB7XXzELRUpicWG4V1r9tnEDiKgyexscnkaJ8ourhKrjyE_mTUaCM",
        tag: null
    }
];

export function StitchTrending() {
    return (
        <>
            <div className="w-full py-12">
                <h2 className="text-center text-3xl font-black tracking-tighter text-text-main dark:text-white md:text-4xl">
                    TRENDING NOW
                </h2>
                <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-primary"></div>
            </div>
            <section className="w-full pb-12 overflow-hidden">
                <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]">
                        {TRENDING_ITEMS.map((item) => (
                            <div key={item.id} className="group relative min-w-[280px] flex-1 cursor-pointer rounded-xl bg-surface-light dark:bg-white/5 p-3 transition-all hover:shadow-xl hover:shadow-black/10">
                                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-200">
                                    <div
                                        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                        style={{ backgroundImage: `url("${item.img}")` }}
                                    >
                                    </div>
                                    {item.tag && (
                                        <div className="absolute top-3 left-3 rounded bg-red-500 px-2 py-1 text-[10px] font-bold text-white uppercase tracking-wide">
                                            {item.tag}
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 rounded-full bg-white dark:bg-background-dark p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined text-[20px] text-primary">favorite</span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-black p-3 text-center text-white translate-y-full transition-transform group-hover:translate-y-0">
                                        <span className="font-bold text-sm">Quick Add</span>
                                    </div>
                                </div>
                                <div className="mt-4 px-1">
                                    <h3 className="text-lg font-bold text-text-main dark:text-white">{item.title}</h3>
                                    <div className="flex items-center justify-between mt-1">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                                        <div className="flex gap-2 items-center">
                                            {item.oldPrice && <span className="text-xs line-through text-gray-400">{item.oldPrice}</span>}
                                            <p className="font-bold text-primary">{item.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
