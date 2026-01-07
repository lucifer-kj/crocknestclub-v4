import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
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
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
