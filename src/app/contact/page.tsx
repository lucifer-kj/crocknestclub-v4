export default function ContactPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
            <main className="flex-grow">
                {/* Hero / Heading Section */}
                <section className="relative overflow-hidden pt-12 pb-8 sm:pt-20 sm:pb-16">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background-light to-background-light dark:from-primary/20 dark:to-background-dark"></div>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary mb-6">
                                    24/7 Support
                                </div>
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
                                    We're here to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">help.</span>
                                </h1>
                                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl">
                                    Have a question about your order, sizing, or our latest drop? We've got you covered. Fill out the form below or explore our quick links.
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <img alt="Customer support team smiling in modern office" className="h-32 w-48 object-cover rounded-xl shadow-lg rotate-3 border-2 border-white dark:border-gray-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6Skekpgj3GOzzYSoePIPk4YAOIWWVSxGG8VQKHwrD-61QItFY4zmsKXLa1-a671GJQLTnjZi1VmqTR7sii24TKdULQo6q2HpAuA237EWAHW7gIL89ynhnS7cgg1Dtw1gVQRV4tzHjHa1EVf-K_CUHwWf5XxNC8TaWaJa3j15l8W0hsKYYqWM3c-s3LSWGz47wVvBIA3D34omy5193K0ZdKX7o977C7kB3Lhz3As7i45KzujMFVoFSTvcG4KzM2Kd2A2qxGlG-PxM" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Grid */}
                <section className="pb-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                            {/* Contact Form (Left Side - Wider) */}
                            <div className="lg:col-span-7 xl:col-span-8">
                                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 sm:p-10 shadow-sm">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">mail</span>
                                        Send us a message
                                    </h2>
                                    <form action="#" className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-900 dark:text-slate-200" htmlFor="name">Name</label>
                                                <input className="w-full h-12 rounded-lg border-gray-200 bg-gray-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-900 transition-all" id="name" placeholder="e.g. Alex Smith" type="text" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-900 dark:text-slate-200" htmlFor="email">Email Address</label>
                                                <input className="w-full h-12 rounded-lg border-gray-200 bg-gray-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-900 transition-all" id="email" placeholder="e.g. alex@example.com" type="email" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-900 dark:text-slate-200" htmlFor="order">Order Number <span className="text-slate-400 font-normal">(Optional)</span></label>
                                            <input className="w-full h-12 rounded-lg border-gray-200 bg-gray-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-900 transition-all" id="order" placeholder="e.g. #12345" type="text" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-900 dark:text-slate-200" htmlFor="message">What's on your mind?</label>
                                            <textarea className="w-full rounded-lg border-gray-200 bg-gray-50 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-900 transition-all resize-none" id="message" placeholder="Type your message here..." rows={5}></textarea>
                                        </div>
                                        <div className="pt-4">
                                            <button className="group relative flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-primary/25 active:scale-95" type="button">
                                                <span>Send Message</span>
                                                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">send</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {/* Side Info (Right Side) */}
                            <div className="lg:col-span-5 xl:col-span-4 space-y-8">
                                {/* Quick Links Card */}
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 sm:p-8">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Quick Answers</h3>
                                    <ul className="space-y-4">
                                        <li>
                                            <a className="group flex items-center justify-between rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:border-primary hover:shadow-md dark:hover:border-primary" href="#">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-primary dark:bg-blue-900/30">
                                                        <span className="material-symbols-outlined text-[18px]">help</span>
                                                    </div>
                                                    <span className="font-medium text-slate-900 dark:text-white">FAQ Center</span>
                                                </div>
                                                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">arrow_forward_ios</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="group flex items-center justify-between rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:border-primary hover:shadow-md dark:hover:border-primary" href="#">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-primary dark:bg-blue-900/30">
                                                        <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                                                    </div>
                                                    <span className="font-medium text-slate-900 dark:text-white">Shipping Policy</span>
                                                </div>
                                                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">arrow_forward_ios</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="group flex items-center justify-between rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:border-primary hover:shadow-md dark:hover:border-primary" href="#">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-primary dark:bg-blue-900/30">
                                                        <span className="material-symbols-outlined text-[18px]">published_with_changes</span>
                                                    </div>
                                                    <span className="font-medium text-slate-900 dark:text-white">Returns & Exchanges</span>
                                                </div>
                                                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">arrow_forward_ios</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                {/* Contact Info */}
                                <div className="rounded-2xl border border-primary bg-primary/5 p-6 sm:p-8 dark:bg-primary/10">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Direct Contacts</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-primary mt-1">alternate_email</span>
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email</p>
                                                <a className="text-base font-bold text-slate-900 hover:text-primary hover:underline dark:text-white" href="mailto:support@crocknestclub.com">support@crocknestclub.com</a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-primary mt-1">schedule</span>
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Support Hours</p>
                                                <p className="text-base font-medium text-slate-900 dark:text-white">Mon-Fri: 9am - 5pm EST</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-6 border-primary/20" />
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Connect on Socials</p>
                                        <div className="flex gap-3">
                                            <a className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition-transform hover:scale-110 hover:text-primary dark:bg-gray-800 dark:text-white" href="#">
                                                <span className="material-symbols-outlined">photo_camera</span>
                                            </a>
                                            <a className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition-transform hover:scale-110 hover:text-primary dark:bg-gray-800 dark:text-white" href="#">
                                                <span className="material-symbols-outlined">videocam</span>
                                            </a>
                                            <a className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition-transform hover:scale-110 hover:text-primary dark:bg-gray-800 dark:text-white" href="#">
                                                <span className="material-symbols-outlined">push_pin</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Floating Chat Button */}
                <button className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/40 transition-transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    <span className="material-symbols-outlined text-[28px]">chat_bubble</span>
                </button>
            </main>
        </div>
    );
}
