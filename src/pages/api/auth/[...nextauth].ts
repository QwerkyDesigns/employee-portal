import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { prisma } from '@/lib/client/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { env } from '@/env/server.mjs';
import { CreateUsage } from '@/lib/db/UpdateUsage';


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
        // async signIn({ user, account, profile, email, credentials }) {
            // do a check on 'updated at' columns and if it is null, then prepopulate with account setup data
            // there is no fking 'signUp' callback from what I can tell in the prisma adapter

            // console.log("====USER======")
            // console.log(user)
            // console.log("=====ACCOUNT=====")
            // console.log(account)
            // console.log("=====PROFILE=====")
            // console.log(profile)
            // console.log("====EMAIL======")
            // console.log(email)
            // console.log("====CREDENTIAL======")
            // console.log(credentials)
            // console.log("==========")

            // if (account?.usageId === null || account?.usageId === undefined) {
            //     console.log("====ACCOUNT USAGE NOT NUL??======")
            //     console.log(account.usageId);
            //     await CreateUsage(user, NEW_ACCOUNT_CREDITS);
            // }
            // return true;
        // },
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
