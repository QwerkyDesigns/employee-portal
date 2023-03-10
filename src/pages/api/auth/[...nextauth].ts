import NextAuth, { Awaitable, NextAuthOptions, User } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/client/prisma';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Username or Email and Password',
            credentials: {
                usernameOrEmail: { label: 'Username', type: 'text', placeholder: 'username or email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req): Promise<Awaitable<User | null>> {
                console.log(credentials);

                let account = await prisma.account.findUnique({
                    where: {
                        userName: credentials?.usernameOrEmail
                    }
                });

                console.log(account);
                if (account === null) {
                    account = await prisma.account.findUnique({
                        where: {
                            email: credentials?.usernameOrEmail
                        }
                    });
                }
                console.log(account);
                if (account === null) {
                    return null;
                }

                console;
                // TODO: encrypt this with salt. I have prior art for this available - later b4 prod tho
                if (account?.password !== credentials?.password) {
                    return null;
                }

                if (!account) {
                    return null;
                }
                const user: User = { id: account?.id.toString(), email: account?.email, name: account.userName };
                return user;
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
        // GoogleProvider({
        //   clientId: process.env.GOOGLE_ID,
        //   clientSecret: process.env.GOOGLE_SECRET,
        // }),
    ],
    theme: {
        colorScheme: 'light'
    }
    // callbacks: {
    //   async jwt({ token }) {
    //     token.userRole = "admin";
    //     return token;
    //   },
    // },
};

export default NextAuth(authOptions);
