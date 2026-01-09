import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function CheckoutPage() {
    const session = await auth();
    let savedAddresses: any[] = []; // Explicitly typing as any[] to avoid complex Prisma type matching for now

    if (session?.user?.id) {
        savedAddresses = await prisma.address.findMany({
            where: { userId: session.user.id },
            include: { user: true }
        });
    }

    return (
        <div className="min-h-screen bg-white dark:bg-background-dark text-black dark:text-white">
            <CheckoutHeader />
            <main className="w-full">
                <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row">
                    <CheckoutForm savedAddresses={savedAddresses} />
                    <OrderSummary />
                </div>
            </main>
        </div>
    );
}
