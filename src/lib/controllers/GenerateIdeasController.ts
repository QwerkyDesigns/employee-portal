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
        console.log('-=========={API1}============');
        const { prompt } = getBody<GenerateTextRequest>(req);
        console.log(prompt);
        console.log('-=========={API2}============');
        const generatedText = await requestNewGeneratedText(prompt);
        console.log(generatedText);
        console.log('-=========={API3}============');
        const textChoices = generatedText.map((x) => x.text ?? '').filter((x) => x !== '');
        console.log(textChoices);
        console.log('-========={APIE}=============');

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
