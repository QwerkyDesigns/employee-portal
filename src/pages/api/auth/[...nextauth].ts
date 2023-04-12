import NextAuth, { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { prisma } from '@/lib/client/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { env } from '@/env/server.mjs';
import { compareCredentials } from '@/lib/utils/credentials/compareCredentials';
import CredentialsProvider from 'next-auth/providers/credentials';


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
        }),
        CredentialsProvider({
            name: 'credentials',
            type: 'credentials',
            credentials: {
                emailaddress: { label: 'Email', type: 'email', placeholder: 'Your email' },
                password: { label: 'Password', type: 'password', placeholder: 'Your Password' }
            },
            authorize: async (credentials: any): Promise<User | null> => {
                if (credentials === null || credentials === undefined) {
                    return null;
                }

                const email = credentials.emailaddress;
                const password = credentials.password;
                if (email === null || password === password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.emailaddress
                    }
                });
                if (user === null || user.password === null) {
                    return null;
                }

                const result = compareCredentials(credentials.password, user.password);

                if (!result) {
                    return null;
                }
                return user;
            }
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
