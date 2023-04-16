import { NextApiRequest, NextApiResponse } from 'next';
import { getBody } from 'nextjs-backend-helpers';
import { StatusCodes } from '../enums/StatusCodes';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';
import ArgumentError from '../errors/bad-request/ArgumentError';
import requestNewGeneratedText from '../externalServices/openAi/chatgpt/requestNewText';
import { Session, getServerSession } from 'next-auth';
import authOptions from "@/pages/api/auth/[...nextauth]"
import { GetAccountByEmail } from '../db/GetAccount';

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
        const { prompt } = getBody<GenerateIdeasRequest>(req);

        const session = await getServerSession(req, res, authOptions) as Session;
        const email = session?.user?.email;
        if (email === null || email === undefined) {
            throw new Error("Fuck");
        }
        const account = await GetAccountByEmail(email);
        const generatedIdeas = await requestNewGeneratedText(prompt, account);
        return res.json({ ideas: generatedIdeas });
    }
}

export type GenerateIdeasRequest = {
    prompt: string;
};

export type GenerateIdeasResponse = {
    ideas: string[];
};

export default GenerateTextController;
