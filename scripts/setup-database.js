require('dotenv').config({ path: './scripts/.env.external' });
const config = require('./../dev.config.js');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});

async function main() {
    // Create a new user
    const user = await prisma.user.create({
        data: {
            name: config.name,
            email: config.email,
            password: config.password,
            sessions: {
                create: [
                    {
                        sessionToken: 'sessiontoken123',
                        expires: new Date('2023-12-31T23:59:59Z')
                    }
                ]
            },
            accounts: {
                create: [
                    {
                        stripeCustomerId: config.stripeCustomerId,
                        type: 'default',
                        provider: 'pasword',
                        providerAccountId: 'account123',
                        refresh_token: 'refreshtoken123',
                        access_token: 'accesstoken123',
                        expires_at: 1640966400, // UNIX timestamp for 2022-12-31 00:00:00 UTC
                        token_type: 'bearer',
                        scope: 'read write',
                        id_token: 'idtoken123',
                        session_state: 'sessionstate123'
                    }
                ]
            }
        }
    });

    console.log('Created user:', user);

    // Create a new usage record for the user's account
    const usage = await prisma.usage.create({
        data: {
            availableFunds: 100.0,
            Account: {
                connect: {
                    id: user.accounts[0].id
                }
            }
        }
    });

    console.log('Created usage:', usage);
}
