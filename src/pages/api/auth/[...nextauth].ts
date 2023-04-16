import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { prisma } from '@/lib/client/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { env } from '@/env/server.mjs';


export default NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60 // 30 days
    },
    secret: env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    debug: true,
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET
        })
    ],
    callbacks: {

        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        session: ({ session, token }) => {
            // @ts-ignore
            if (token && session.id! !== undefined) {
                // @ts-ignore
                session.id = token.id;
            }
            return session;
        }
    }
});
