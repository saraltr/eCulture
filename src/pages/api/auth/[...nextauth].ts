import NextAuth, { NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Auth0Provider from "next-auth/providers/auth0";

export const authConfig = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [Auth0Provider({
        clientId: process.env.AUTH0_CLIENT_ID as string,
        clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
        issuer: process.env.AUTH0_ISSUER_BASE_URL
    }),
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            // allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },
    adapter: PrismaAdapter(prisma) as Adapter
} satisfies NextAuthOptions;

export default NextAuth(authConfig);