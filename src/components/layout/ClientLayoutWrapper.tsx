"use client";

import { usePathname } from "next/navigation";
import { StitchHeader } from "@/components/layout/StitchHeader";
import { StitchFooter } from "@/components/layout/StitchFooter";

export default function ClientLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    // Hide global header/footer on checkout and success pages
    const isCheckoutFlow = ["/checkout", "/success"].includes(pathname);

    if (isCheckoutFlow) {
        return <main className="flex-1">{children}</main>;
    }

    return (
        <>
            <StitchHeader />
            <main className="flex-1">
                {children}
            </main>
            <StitchFooter />
        </>
    );
}
