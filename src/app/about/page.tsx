export default function AboutPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-text-main dark:text-white">
            <main className="flex flex-col flex-1 w-full max-w-[1440px] mx-auto">
                {/* Hero Section */}
                <section className="px-4 md:px-10 lg:px-40 py-12 md:py-20">
                    <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
                        <div className="flex flex-col gap-6 flex-1 text-center lg:text-left items-center lg:items-start">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-text-main dark:text-white text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter">
                                    WE DON'T <br /><span className="text-primary">DO BORING.</span>
                                </h1>
                                <h2 className="text-text-main/80 dark:text-gray-300 text-lg md:text-xl font-medium mt-4 max-w-lg">
                                    Not Just a Brand. It's a Movement. We exist to kill fast-fashion boredom with unique prints and bold statements.
                                </h2>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <button className="h-12 px-8 bg-black hover:bg-gray-800 text-white rounded-lg font-bold tracking-wide transition-all hover:scale-105 active:scale-95 shadow-[4px_4px_0px_0px_rgba(43,76,255,0.3)]">
                                    Shop the Drop
                                </button>
                                <button className="h-12 px-8 bg-transparent border-2 border-primary text-black dark:text-white hover:bg-black hover:text-white rounded-lg font-bold tracking-wide transition-all">
                                    Our Story
                                </button>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className="relative w-full aspect-square md:aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border-[1px] border-primary">
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent z-10"></div>
                                <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCLzs7F_jfmLDXjlfE4U5B11kRLK3MTDD9J3oKEXVCW-XScPfR4IU5TeSJxqiqRZF7e-wKY3O7aC0RLJ5iKOzVo8OVETb-yMVEBY67xQyx2ehZ3srWYyf1i7KQlFPJ9_X4jNYv1wM9jh411Yn8bIMVHEqg5Nnguwd7RjpkZrxYFzmak9e0WcRNTxlDo5XqB4wtpjwpFKkTqKIubYiOAfdombuj_5GGNRQDscnyA6lP4UmRByuF_VuAt5fKzcslDR3-d2pVDyK4EJdo")' }}></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Marquee Section */}
                <div className="w-full bg-black overflow-hidden py-3 mb-10 -skew-y-1 border-y-4 border-primary">
                    <div className="flex gap-8 whitespace-nowrap animate-marquee">
                        <span className="text-white font-black text-xl uppercase tracking-widest">• EST 2020 • BOLD PRINTS • NO BORING CLOTHES • GEN Z APPROVED • WORLDWIDE SHIPPING • EST 2020 • BOLD PRINTS • NO BORING CLOTHES • GEN Z APPROVED • WORLDWIDE SHIPPING</span>
                        <span aria-hidden="true" className="text-white font-black text-xl uppercase tracking-widest">• EST 2020 • BOLD PRINTS • NO BORING CLOTHES • GEN Z APPROVED • WORLDWIDE SHIPPING • EST 2020 • BOLD PRINTS • NO BORING CLOTHES • GEN Z APPROVED • WORLDWIDE SHIPPING</span>
                    </div>
                </div>

                {/* Values Section */}
                <section className="px-4 md:px-10 lg:px-40 py-16 bg-white dark:bg-white/5 rounded-3xl mx-4 my-8 shadow-sm">
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                            <div className="flex flex-col gap-4 max-w-2xl">
                                <h2 className="text-text-main dark:text-white text-4xl font-black tracking-tight leading-none">
                                    OUR <span className="text-primary border-b-4 border-primary">VALUES</span>
                                </h2>
                                <p className="text-text-main/70 dark:text-gray-300 text-lg">What makes CROCKNESTCLUB unique in a sea of sameness.</p>
                            </div>
                            <a className="text-black dark:text-white font-bold flex items-center gap-1 hover:gap-2 transition-all hover:text-primary" href="#">
                                Learn more about sustainability <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </a>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: 'eco', title: 'Eco-Conscious', text: "We don't just print cool stuff. We use sustainable inks and ethically sourced fabrics for a better future." },
                                { icon: 'brush', title: 'Bold Prints', text: "Designs that demand attention. Our in-house artists create patterns you won't find anywhere else." },
                                { icon: 'group', title: 'GenZ First', text: "Fashion made for the new generation. We listen to what you want and drop it before it's cool." }
                            ].map((item, index) => (
                                <div key={index} className="flex flex-col gap-4 rounded-xl border-[1px] border-primary bg-white dark:bg-background-dark dark:border-white/10 p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300">
                                    <div className="size-12 rounded-full bg-black flex items-center justify-center text-white">
                                        <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-text-main dark:text-white text-xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-text-main/70 dark:text-gray-400 text-sm leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="px-4 md:px-10 lg:px-40 py-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-black text-text-main dark:text-white mb-3">HOW IT STARTED</h2>
                            <div className="w-24 h-2 bg-primary mx-auto"></div>
                        </div>
                        <div className="grid grid-cols-[50px_1fr] gap-x-6 md:gap-x-10">
                            {/* 2020 */}
                            <div className="flex flex-col items-center">
                                <div className="size-10 rounded-full bg-black text-white flex items-center justify-center shadow-lg z-10 border-[1px] border-primary">
                                    <span className="material-symbols-outlined text-xl">lightbulb</span>
                                </div>
                                <div className="w-1 bg-primary h-full grow min-h-[80px]"></div>
                            </div>
                            <div className="flex flex-col pb-12 pt-1">
                                <span className="text-primary font-bold text-sm tracking-widest uppercase mb-1">2020</span>
                                <h3 className="text-text-main dark:text-white text-xl font-bold">The Idea Spark</h3>
                                <p className="text-text-main/70 dark:text-gray-400 mt-2">Bored in lockdown, we decided to tie-dye our old shirts. It turned into a business overnight.</p>
                            </div>
                            {/* 2021 */}
                            <div className="flex flex-col items-center">
                                <div className="w-1 bg-primary h-8"></div>
                                <div className="size-10 rounded-full bg-white border-[1px] border-primary text-black flex items-center justify-center shadow-lg z-10">
                                    <span className="material-symbols-outlined text-xl">checkroom</span>
                                </div>
                                <div className="w-1 bg-primary h-full grow min-h-[80px]"></div>
                            </div>
                            <div className="flex flex-col pb-12 pt-1">
                                <span className="text-primary font-bold text-sm tracking-widest uppercase mb-1">2021</span>
                                <h3 className="text-text-main dark:text-white text-xl font-bold">First Collection Drop</h3>
                                <p className="text-text-main/70 dark:text-gray-400 mt-2">Sold out in 24 hours. We knew we were onto something big. The "Neon Jungle" collection was born.</p>
                            </div>
                            {/* 2022 */}
                            <div className="flex flex-col items-center">
                                <div className="w-1 bg-primary h-8"></div>
                                <div className="size-10 rounded-full bg-white border-[1px] border-primary text-black flex items-center justify-center shadow-lg z-10">
                                    <span className="material-symbols-outlined text-xl">rocket_launch</span>
                                </div>
                                <div className="w-1 bg-primary h-full grow min-h-[80px]"></div>
                            </div>
                            <div className="flex flex-col pb-12 pt-1">
                                <span className="text-primary font-bold text-sm tracking-widest uppercase mb-1">2022</span>
                                <h3 className="text-text-main dark:text-white text-xl font-bold">Going Viral</h3>
                                <p className="text-text-main/70 dark:text-gray-400 mt-2">TikTok found us. 50M views later, we were shipping to 30 countries.</p>
                            </div>
                            {/* 2023 */}
                            <div className="flex flex-col items-center">
                                <div className="w-1 bg-primary h-8"></div>
                                <div className="size-10 rounded-full bg-black text-white flex items-center justify-center shadow-lg z-10 border-[1px] border-primary">
                                    <span className="material-symbols-outlined text-xl">public</span>
                                </div>
                            </div>
                            <div className="flex flex-col pt-1">
                                <span className="text-primary font-bold text-sm tracking-widest uppercase mb-1">2023 - Present</span>
                                <h3 className="text-text-main dark:text-white text-xl font-bold">Global Expansion</h3>
                                <p className="text-text-main/70 dark:text-gray-400 mt-2">Opening pop-up stores in NYC and Tokyo. This is just the beginning.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Creators Section */}
                <section className="px-4 md:px-10 lg:px-40 py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-text-main dark:text-white">MEET THE CREATORS</h2>
                        <p className="text-text-main/60 dark:text-gray-400 mt-2">The brains behind the bold.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-10">
                        {/* Alex */}
                        <div className="flex flex-col items-center gap-3 group">
                            <div className="size-32 rounded-full overflow-hidden border-[1px] border-primary p-1 group-hover:scale-110 transition-transform">
                                <div className="w-full h-full rounded-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDs7BUkQBj0mlRP2un-51gKICtwTJ8LYXaQOHibp5eDNknWshazH-rvFHIcUAW7yIqsk-P6yu-Vi6YowjGctmY-P8uwNVHHos0ah9mJON9NG9fObPpHBynvmp9XtdF443hvv3zPHPKSkKa-lQ7AdM222ZFOQN92YbT8AS_fzARh8HLny1-uEHJsoNCXgDswwNjgG6LZH6_RMYlrEK882pd5v_W1fUavbntXTbFVUF5VShnZFCaUC5JjHeIxm-5CvlzrCkzazLr3s60')" }}></div>
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-lg text-text-main dark:text-white">Alex Doe</h3>
                                <p className="text-primary text-sm font-medium">Founder & Creative</p>
                            </div>
                        </div>
                        {/* Other creators... placeholders for brevity if needed, but adding all 3 for completeness */}
                        <div className="flex flex-col items-center gap-3 group">
                            <div className="size-32 rounded-full overflow-hidden border-[1px] border-primary p-1 group-hover:scale-110 transition-transform">
                                <div className="w-full h-full rounded-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmOybulP98BrMn8mjkfWTGkT8Pn9rih2aq7ZMYOTxPXD_-81iUWPHdn2_g5dhAIOADDhlhFbV6qSBmP_-92TQG7hAI0UxGqv_iNe77Q0zgdrWU8Bexu1gjwOD16Y9xEM0tppItVpW7UGjT655Pvjh_KnpbEgR8gM6IJ3w0V564R_JG0MQkSg04h5Ph0lLXQN55d7bNAWSfwTeIYM8-9R04BlxBY2LDqRolcnaxsDHABNim91RVLU8gYXYWxtkXONxcCNI3QlVzj1U')" }}></div>
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-lg text-text-main dark:text-white">Jordan Smith</h3>
                                <p className="text-primary text-sm font-medium">Head of Style</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-3 group">
                            <div className="size-32 rounded-full overflow-hidden border-[1px] border-primary p-1 group-hover:scale-110 transition-transform">
                                <div className="w-full h-full rounded-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5FFMn8Hv32O4Kk_L3hnV0jF3IGNmclkpbNzWdZhrkRr8gWgI-bZma1ikGrNB7TduBrp54vyqyBBiA2e1JeJUu2EMFKzEWzalPAv-3HmgyyLEYh2WF8djUANQvuyJbaaTdIk6a_Gl4SueaD5cYn9WijzlXl63lrW-7MzRRrcotr53NKU6q4C_17KsvcaKyu9-fFQx89Q_m4mlWiwQxS8QKzUkZ_hbNIY-PhkUGFRsYjyBfeLT6n9LTuTNQ60n7FBTgqXAKIzR3Pe4')" }}></div>
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-lg text-text-main dark:text-white">Taylor Kim</h3>
                                <p className="text-primary text-sm font-medium">Marketing Guru</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
