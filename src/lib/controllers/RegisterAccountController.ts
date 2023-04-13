import { NextApiRequest, NextApiResponse } from 'next';
import { getBody } from 'nextjs-backend-helpers';
import { prisma } from '../client/prisma';
import hashPassword from '../utils/credentials/hash';
import { Controller, errors } from 'nextjs-backend-helpers';

async function createUser(email: string, encryptedPassword: string) {
    return prisma.user
        .create({
            data: {
                email: email,
                password: encryptedPassword,
               
            }, 
        })
        .catch((error: any) => {
            console.error('Failed to store account data:', error);
        });
}

class RegisterAccountController extends Controller {
    async post(request: NextApiRequest, res: NextApiResponse<RegistrationResponse>) {
        const { email, password } = getBody<RegistrationPayload>(request);
        const encryptedPassword = hashPassword(password);
        await createUser(email.toLowerCase(), encryptedPassword);
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
