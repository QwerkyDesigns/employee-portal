import NextAuth, { NextAuthOptions, User } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/client/prisma';
import { compareCredentials } from '@/lib/utils/credentials/compareCredentials';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Username or Email and Password',
            credentials: {
                usernameOrEmail: { label: 'Username', type: 'text', placeholder: 'username or email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req): Promise<User | null> {
                if (credentials === null) return null;
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.usernameOrEmail
                    }
                });
                if (user === null) {
                    return null;
                }

                if (user.password === null || credentials?.password === null) return null;
                const result = compareCredentials(credentials!.password, user.password);

                if (!result) {
                    return null;
                }

                const discoveredUser: User = { id: user?.id.toString(), email: user?.email, name: user.name };
                return discoveredUser;
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
