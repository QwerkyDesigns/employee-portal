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

prisma.user
    .create({
        data: {
            name: config.name,
            email: config.email,
            password: config.password,
            sessions: {
                create: [
                    // {
                    //     sessionToken: 'sessiontoken123',
                    //     expires: new Date('2023-12-31T23:59:59Z')
                    // }
                ]
            },
            accounts: {
                create: [
                    {
                        stripeCustomerId: config.stripeCustomerId,
                        type: 'default',
                        provider: 'password',
                        providerAccountId: 'account123',
                        refresh_token: null,
                        access_token: null,
                        expires_at: null, // UNIX timestamp for 2022-12-31 00:00:00 UTC
                        token_type: null,
                        scope: 'read', // on account verification: 'read write'
                        id_token: null,
                        session_state: null
                    }
                ]
            }
        }
    })
    .then((user) => {
        console.log('Account Data stored in the database.');
        prisma.account
            .findFirst({
                where: {
                    userId: user.id
                }
            })
            .then((account) => {
                prisma.usage
                    .create({
                        data: {
                            availableFunds: 100.0,
                            Account: {
                                connect: {
                                    id: account.id
                                }
                            }
                        }
                    })
                    .then(() => {
                        console.log('Usage funds stored in the database.');
                    })
                    .catch((error) => {
                        console.error('Failed to store usage data:', error);
                    })
                    .finally(() => {
                        prisma.$disconnect();
                    });
            });
    })
    .catch((error) => {
        console.error('Failed to store account data:', error);
    });
