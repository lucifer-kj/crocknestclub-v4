export default function WishlistPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-black tracking-tight text-black dark:text-white">My Wishlist</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/10 p-6">
                    <p className="text-gray-500">Your wishlist is growing! (Placeholder)</p>
                </div>
            </div>
        </div>
    );
}
