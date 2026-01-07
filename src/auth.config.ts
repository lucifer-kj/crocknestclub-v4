import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: "/login",
        newUser: "/register", // Redirect here after sign up if needed, or NextAuth uses it for redirects
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnAdmin = nextUrl.pathname.startsWith('/admin')

            if (isOnAdmin) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            }

            // For other routes, allow access
            return true
        },
        jwt({ token, user }) {
            if (user) {
                token.role = user.role
                token.id = user.id
            }
            return token
        },
        session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            if (token.role && session.user) {
                session.user.role = token.role as string
            }
            return session
        }
    },
    providers: [], // Configured in auth.ts
} satisfies NextAuthConfig
