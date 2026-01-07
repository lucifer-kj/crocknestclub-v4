import { AccountSidebar } from "@/components/account/AccountSidebar";

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-gray-50 dark:bg-background-dark min-h-screen">
            <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <AccountSidebar />
                    <div className="flex-1 min-w-0">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
