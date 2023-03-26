import { NextApiRequest, NextApiResponse } from 'next';
import { getBody } from 'nextjs-backend-helpers';
import { StatusCodes } from '../enums/StatusCodes';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';
import ArgumentError from '../errors/bad-request/ArgumentError';
import requestNewGeneratedText from '../externalServices/openAi/chatgpt/requestNewText';

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
        const generatedIdeas = await requestNewGeneratedText(prompt);
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
