import { NextApiRequest, NextApiResponse } from 'next';
import { getBody } from 'nextjs-backend-helpers';
import hashPassword from '../utils/credentials/hash';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';

class RegisterAccountController extends AuthenticatedBaseController {
    async post(request: NextApiRequest, res: NextApiResponse<RegistrationResponse>) {
        const payload = getBody<RegistrationPayload>(request);

        const encryptedPassword = hashPassword(payload.password);


        return res.json({ isSuccess: true});
    }
}

export type RegistrationPayload = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};
export type RegistrationRequest = RegistrationPayload;

export type RegistrationResponse = {
    isSuccess: boolean
};

export default RegisterAccountController;