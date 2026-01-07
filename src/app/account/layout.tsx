import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { AccountLayout } from "@/components/account/AccountLayout"

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth()

    if (!session?.user) {
        redirect("/login?callbackUrl=/account")
    }

    return <AccountLayout>{children}</AccountLayout>
}
