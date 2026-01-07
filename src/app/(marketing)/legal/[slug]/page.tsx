import { notFound } from "next/navigation"

export function generateStaticParams() {
    return [
        { slug: "privacy-policy" },
        { slug: "terms-of-service" },
        { slug: "return-policy" },
        { slug: "shipping-policy" },
    ]
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const content: Record<string, { title: string, body: string }> = {
        "privacy-policy": {
            title: "Privacy Policy",
            body: "This is a placeholder for the Privacy Policy. We respect your data and do not share it with third parties without consent.",
        },
        "terms-of-service": {
            title: "Terms of Service",
            body: "This is a placeholder for the Terms of Service. By using this site, you agree to our terms.",
        },
        "return-policy": {
            title: "Return Policy",
            body: "We accept returns within 30 days of purchase. Items must be unworn and in original packaging.",
        },
        "shipping-policy": {
            title: "Shipping Policy",
            body: "We ship worldwide. Standard shipping takes 3-5 business days.",
        }
    }

    const doc = content[slug]

    if (!doc) notFound()

    return (
        <div className="space-y-6">
            <h1 className="text-4xl font-black uppercase tracking-tighter">{doc.title}</h1>
            <div className="prose prose-lg dark:prose-invert">
                <p>{doc.body}</p>
                <div className="p-4 border-2 border-black bg-muted/20 mt-8">
                    <p className="text-sm font-mono text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    )
}
