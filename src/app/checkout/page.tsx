import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";

export default function CheckoutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-background-dark text-black dark:text-white">
            <CheckoutHeader />
            <main className="w-full">
                <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row">
                    <CheckoutForm />
                    <OrderSummary />
                </div>
            </main>
        </div>
    );
}
