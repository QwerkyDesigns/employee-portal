import { NextApiRequest, NextApiResponse } from 'next';
import { getBody } from 'nextjs-backend-helpers';
import { prisma } from '../client/prisma';
import hashPassword from '../utils/credentials/hash';
import { Controller, errors } from 'nextjs-backend-helpers';

// TODO: WORK IN PROGRESS - learning atm
async function createUser(email: string, encryptedPassword: string){
    // return prisma.user.create({
    //     data: {
    //         email,
    //         password: encryptedPassword
        
    //     }
    // }).then((user) => {
    //     console.log(user);
    // });
    return prisma.user
        .create({
            data: {
                email: email,
                password: encryptedPassword,
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
                            stripeCustomerId: "cus_123455"
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
                                        id: account?.id
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
    

}

class RegisterAccountController extends Controller {
    async post(request: NextApiRequest, res: NextApiResponse<RegistrationResponse>) {
        const { email, password } = getBody<RegistrationPayload>(request);
        console.log(email)
        console.log(password)

        const encryptedPassword = hashPassword(password);
        console.log(encryptedPassword);
        await createUser(email, encryptedPassword);

        return res.json({ isSuccess: true });
    }
}

export type RegistrationPayload = {
    email: string;
    password: string;
};

export type RegistrationRequest = RegistrationPayload;

export type RegistrationResponse = {
    isSuccess: boolean;
};

export default RegisterAccountController;
