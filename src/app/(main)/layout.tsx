import { StitchHeader } from "@/components/layout/StitchHeader";
import { StitchFooter } from "@/components/layout/StitchFooter";

export default function MainLayout({ children }: { children: React.ReactNode }) {
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
