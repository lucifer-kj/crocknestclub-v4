import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

// Simple in-memory rate map (Note: This resets on server restart/cold boot, suitable for simple protection)
const rateLimitMap = new Map()

export default auth((req) => {
    // 1. Rate Limiting for API routes
    if (req.nextUrl.pathname.startsWith('/api')) {
        const ip = req.headers.get('x-forwarded-for') || 'ip'
        const limit = 100 // requests per minute
        const windowMs = 60 * 1000

        if (!rateLimitMap.has(ip)) {
            rateLimitMap.set(ip, { count: 0, lastReset: Date.now() })
        }

        const ipData = rateLimitMap.get(ip)
        if (Date.now() - ipData.lastReset > windowMs) {
            ipData.count = 0
            ipData.lastReset = Date.now()
        }

        if (ipData.count >= limit) {
            return new NextResponse('Too Many Requests', { status: 429 })
        }

        ipData.count += 1
    }

    // 2. Auth Logic
    // req.auth is populated by the auth method
    const isAuthenticated = !!req.auth
    const userRole = req.auth?.user?.role
    const isAccessingAdmin = req.nextUrl.pathname.startsWith("/admin")

    if (isAccessingAdmin) {
        if (!isAuthenticated) {
            return Response.redirect(new URL("/login", req.nextUrl))
        }
        if (userRole !== "ADMIN") {
            return Response.redirect(new URL("/", req.nextUrl))
        }
    }
})

export const config = {
    // Updated matcher to include api routes for rate limiting, but exclude static assets
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
