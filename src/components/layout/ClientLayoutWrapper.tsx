"use client";

import { usePathname } from "next/navigation";
import { StitchHeader } from "@/components/layout/StitchHeader";
import { StitchFooter } from "@/components/layout/StitchFooter";
import { CartProvider } from "@/store/cart-context";
import { SessionProvider } from "next-auth/react";

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
            <SessionProvider>
                <CartProvider>
                    <main className="flex-1">{children}</main>
                </CartProvider>
            </SessionProvider>
        );
    }

    return (
        <SessionProvider>
            <CartProvider>
                <StitchHeader />
                <main className="flex-1">
                    {children}
                </main>
                <StitchFooter />
            </CartProvider>
        </SessionProvider>
    );
}
