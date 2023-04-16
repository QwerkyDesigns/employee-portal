import { NextApiRequest, NextApiResponse } from 'next';
import { getBody } from 'nextjs-backend-helpers';
import { StatusCodes } from '../enums/StatusCodes';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';
import ArgumentError from '../errors/bad-request/ArgumentError';
import requestNewGeneratedText from '../externalServices/openAi/chatgpt/requestNewText';
import { Session, getServerSession } from 'next-auth';
import { GetAccountByEmail } from '../db/GetAccount';
import authOptions from "@/pages/api/auth/[...nextauth]"

class GenerateTextController extends AuthenticatedBaseController {
    constructor() {
        super();

        this.rescue(ArgumentError, (error, request, response) => {
            response.status(StatusCodes.InvalidRequest).json({
                errors: [error.message]
            });
        });
    }

    async post(req: NextApiRequest, res: NextApiResponse) {
        const session = await getServerSession(req, res, authOptions) as Session;
        const { prompt } = getBody<GenerateTextRequest>(req);

        if (session === null) {
            throw new Error("Session was null")
        }

        const email = session?.user?.email;
        if (email === null || email === undefined) {
            throw new Error("Email was null");
        }

        const account = await GetAccountByEmail(email);
        const textChoices = await requestNewGeneratedText(prompt, account);
        return res.json({ choices: textChoices });
    }
}

export type GenerateTextRequest = {
    prompt: string;
};

export type GenerateTextResponse = {
    choices: string[];
};

export default GenerateTextController;
