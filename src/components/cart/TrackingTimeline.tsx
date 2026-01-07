export function TrackingTimeline() {
    return (
        <div className="bg-white dark:bg-black/20 border border-primary/20 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>
            <div className="flex items-center justify-between mb-8 relative z-10">
                <h2 className="text-xl font-bold flex items-center gap-2 text-text-main dark:text-white">
                    <span className="material-symbols-outlined text-primary">timeline</span>
                    Order Status
                </h2>
                <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold uppercase rounded-full tracking-wider">In Transit</span>
            </div>

            <div className="relative pl-2">
                {/* Step 1: Confirmed */}
                <div className="grid grid-cols-[40px_1fr] gap-x-4 pb-8 relative z-10">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                            <span className="material-symbols-outlined text-sm font-bold">check</span>
                        </div>
                        <div className="w-[2px] bg-primary h-full mt-2"></div>
                    </div>
                    <div className="pt-1">
                        <p className="text-base font-bold text-text-main dark:text-white">Order Confirmed</p>
                        <p className="text-sm text-gray-500">Oct 20, 10:00 AM</p>
                    </div>
                </div>

                {/* Step 2: Shipped */}
                <div className="grid grid-cols-[40px_1fr] gap-x-4 pb-8 relative z-10">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                            <span className="material-symbols-outlined text-sm font-bold">local_shipping</span>
                        </div>
                        <div className="w-[2px] bg-primary h-full mt-2"></div>
                    </div>
                    <div className="pt-1">
                        <p className="text-base font-bold text-text-main dark:text-white">Shipped</p>
                        <p className="text-sm text-gray-500">Oct 21, 2:00 PM</p>
                        <p className="text-sm text-primary mt-1 font-medium">Carrier: FedEx Express</p>
                    </div>
                </div>

                {/* Step 3: Out for Delivery (Current) */}
                <div className="grid grid-cols-[40px_1fr] gap-x-4 pb-8 relative z-10">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-black/40 border-2 border-primary text-primary flex items-center justify-center animate-pulse">
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                        </div>
                        <div className="w-[2px] bg-gray-200 dark:bg-gray-700 h-full mt-2"></div>
                    </div>
                    <div className="pt-1">
                        <p className="text-base font-bold text-text-main dark:text-white">Out for Delivery</p>
                        <p className="text-sm text-gray-500">Today, 8:00 AM</p>
                        <p className="text-sm text-gray-500 mt-2">Your package is with the local courier.</p>
                    </div>
                </div>

                {/* Step 4: Delivered */}
                <div className="grid grid-cols-[40px_1fr] gap-x-4 relative z-10">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm text-gray-400">package_2</span>
                        </div>
                    </div>
                    <div className="pt-1">
                        <p className="text-base font-medium text-gray-400 dark:text-gray-500">Delivered</p>
                        <p className="text-sm text-gray-400 dark:text-gray-600">Pending</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
