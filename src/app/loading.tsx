export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white/80 dark:bg-black/80 z-[100] flex items-center justify-center backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin"></div>
                <p className="font-black uppercase tracking-widest animate-pulse">Loading...</p>
            </div>
        </div>
    )
}
