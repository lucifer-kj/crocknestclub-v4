"use client";

import { usePathname } from "next/navigation";
import { StitchHeader } from "@/components/layout/StitchHeader";
import { StitchFooter } from "@/components/layout/StitchFooter";
import { CartProvider } from "@/store/cart-context";

export default function ClientLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    // Hide global header/footer on checkout and success pages
    const isCheckoutFlow = ["/checkout", "/success"].includes(pathname);

    if (isCheckoutFlow) {
        return (
            <CartProvider>
                <main className="flex-1">{children}</main>
            </CartProvider>
        );
    }

    return (
        <CartProvider>
            <StitchHeader />
            <main className="flex-1">
                {children}
            </main>
            <StitchFooter />
        </CartProvider>
    );
}
