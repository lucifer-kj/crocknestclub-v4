import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQPage() {
    const faqs = [
        {
            category: "Orders & Shipping",
            items: [
                { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days. International orders may take 7-14 days." },
                { q: "Do you ship internationally?", a: "Yes, we ship to most countries worldwide." },
                { q: "Can I track my order?", a: "Absolutely. You'll receive a tracking number via email once your order ships." },
            ]
        },
        {
            category: "Returns & Exchanges",
            items: [
                { q: "What is your return policy?", a: "We accept returns within 30 days of delivery. Items must be unworn and in original condition." },
                { q: "how do I start a return?", a: "Visit our Contact page or email support@crocknest.com with your order details." },
            ]
        },
        {
            category: "Products",
            items: [
                { q: "How do the sizes fit?", a: "Our apparel is true to size. For an oversized look, we recommend sizing up." },
                { q: "Are the collectibles limited edition?", a: "Yes, items marked 'High Scarcity' are limited run and will not be restocked." },
            ]
        }
    ]

    return (
        <div className="max-w-3xl mx-auto py-16 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Freq. Asked Questions</h1>
                <p className="text-muted-foreground">Everything you need to know.</p>
            </div>

            <div className="space-y-8">
                {faqs.map((section) => (
                    <div key={section.category} className="border-2 border-black bg-card p-6">
                        <h2 className="font-bold uppercase text-xl mb-4 text-primary">{section.category}</h2>
                        <Accordion type="single" collapsible className="w-full">
                            {section.items.map((item, index) => (
                                <AccordionItem key={index} value={`${section.category}-${index}`} className="border-black/10">
                                    <AccordionTrigger className="text-left font-bold hover:text-primary uppercase">{item.q}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {item.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                ))}
            </div>
        </div>
    )
}
