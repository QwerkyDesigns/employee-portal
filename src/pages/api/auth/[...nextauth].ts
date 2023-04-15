import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { prisma } from '@/lib/client/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { env } from '@/env/server.mjs';

const NEW_ACCOUNT_CREDITS = 500000; // five hundred thousands == $1

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
        async signIn({ user, account, profile, email, credentials }) {
            // do a check on 'updated at' columns and if it is null, then prepopulate with account setup data
            // there is no fucking 'signUp' callback from what I can tell in the prisma adapter

            // let userAccount;
            // try {
            //     // TODO: cookie to check if this check has already been done maybe? maybe not
            //     const loadedUser = await prisma.user.findUnique({ where: { email: user.email ?? '' } });
            //     userAccount = await prisma.account.findFirst({ where: { userId: loadedUser?.id }, include: { usage: true } })
            // } catch (err: any) {
            //     return false;
            // }

            // let exists = userAccount?.usage === null;
            // if (!exists) {
            //     try {
            //         await prisma.usage
            //             .create({
            //                 data: {
            //                     availableFunds: NEW_ACCOUNT_CREDITS,
            //                     Account: {
            //                         connect: {
            //                             id: userAccount?.id
            //                         }
            //                     }
            //                 },
            //                 include: { Account: true }
            //             });
            //     } catch (error: any) {
            //         console.error('Failed to store usage data:', error);
            //         return false
            //     }
            // }

            return true;
        },
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
