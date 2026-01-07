"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"

export function SearchInput() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [query, setQuery] = useState(searchParams.get("q") || "")
    const [isPending, startTransition] = useTransition()

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (query.trim()) {
            startTransition(() => {
                router.push(`/search?q=${encodeURIComponent(query)}`)
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-[200px] md:max-w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="SEARCH..."
                className="w-full rounded-none border-2 border-black pl-9 bg-muted/20 focus:bg-background transition-colors placeholder:text-muted-foreground/70 text-xs font-bold uppercase tracking-wider"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                name="q"
            />
        </form>
    )
}
