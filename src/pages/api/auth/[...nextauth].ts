import NextAuth, { NextAuthOptions, User } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/client/prisma';
import { compareCredentials } from '@/lib/utils/credentials/compareCredentials';
import { JWTOptions } from 'next-auth/jwt';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { env } from '@/env/server.mjs';

export default NextAuth({
    session: {
        strategy: "jwt"
    },
    secret: "testtesttesttesttesttesttest",
    adapter: PrismaAdapter(prisma),
    debug: true,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ],
    callbacks: {
        signIn({ user, account, profile, email, credentials}){
            return "/portal"
        }
    }
});
//     CredentialsProvider({
//         name: 'credentials',
//         type: 'credentials',
//         credentials: {
//             emailaddress: { label: 'Email', type: 'email', placeholder: 'Your email' },
//             password: { label: 'Password', type: 'password', placeholder: 'Your Password' }
//         },
//         authorize: async (credentials): Promise<User | null> => {
//             if (credentials === null || credentials === undefined) {
//                 return null;
//             }

//             const email = credentials.emailaddress;
//             const password = credentials.password;
//             if (email === null || password === password) {
//                 return null;
//             }

//             const user = await prisma.user.findUnique({
//                 where: {
//                     email: credentials.emailaddress
//                 }
//             });
//             if (user === null || user.password === null) {
//                 return null;
//             }

//             const result = compareCredentials(credentials.password, user.password);

//             if (!result) {
//                 return null;
//             }
//             return user;
//         }
//     })
// ],
// callbacks: {
//     jwt: async ({ token, user }) => {
//         if (user) {
//             token.id = user.id;
//         }
//         return token;
//     },
//     session: ({ session, token }) => {
//         // if (token && session.id! !== undefined) {
//         //     session.id = token.id;
//         // }
//         return session;
//     }
// },
// secret: 'test',
// session: {
//     strategy: 'jwt'
// },
// jwt: {
//     secret: 'test',
//     encryption: true
// } as Partial<JWTOptions>
// });
