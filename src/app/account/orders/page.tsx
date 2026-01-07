export default function OrdersPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-black tracking-tight text-black dark:text-white">My Orders</h1>
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
                <div className="p-8 text-center text-gray-500">
                    <p>No additional orders found.</p>
                </div>
            </div>
        </div>
    );
}
