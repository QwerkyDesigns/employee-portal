import { NextApiRequest, NextApiResponse } from 'next';
import { Session, getServerSession } from 'next-auth';
import { Controller } from 'nextjs-backend-helpers';
import authOptions from "@/pages/api/auth/[...nextauth]"
import { ExternalServiceKeys } from "@prisma/client";
import { ExternalServices } from '../enums/ExternalServices';
import { GetExternalServices } from '../db/GetExternalServices';

function retrieveRegisteredTargets(externalServiceKeys: ExternalServiceKeys): string[] {
    // TODO: doing this manually for now
    const nonNullKeys: string[] = [];
    if (externalServiceKeys.printifyApiKey !== null) {
        nonNullKeys.push(ExternalServices.Printify.toString());
    }

    return nonNullKeys;
}

class RegisteredTargetsController extends Controller {
    async post(req: NextApiRequest, res: NextApiResponse<RegisteredTargetsResponse>) {

        const session = await getServerSession(req, res, authOptions) as Session;
        const email = session?.user?.email;
        if (email === null || email === undefined) {
            throw new Error("Could not find session");
        }
        const account = await GetExternalServices(email);

        const targets = retrieveRegisteredTargets(account)

        return res.json({ targets });
    }
}

export type RegistrationPayload = {
    email: string;
    password: string;
};

export type RegisteredTargetsRequest = {};

export type RegisteredTargetsResponse = {
    targets: string[];
};

export default RegisteredTargetsController;
