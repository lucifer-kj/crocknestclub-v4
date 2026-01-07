import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AddressPage() {
    return (
        <div className="text-center py-10 space-y-4">
            <h1 className="text-2xl font-black uppercase">Address Book</h1>
            <p className="text-muted-foreground">Manage your shipping addresses here.</p>
            <div className="bg-muted p-4 border-2 border-black inline-block">
                <p>Feature coming in next update.</p>
            </div>
            <br />
            <Button className="rounded-none border-2 border-black" asChild>
                <Link href="/account">Back to Dashboard</Link>
            </Button>
        </div>
    )
}
