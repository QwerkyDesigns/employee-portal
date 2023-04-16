import openApiClient from '@/lib/client/openApiClient';
import { UpdateUsage } from '@/lib/db/UpdateUsage';
import { Account } from '@prisma/client';
import { Session } from 'next-auth';
import { Logger } from 'nextjs-backend-helpers';
import { CreateCompletionRequest, CreateCompletionResponseChoicesInner } from 'openai';

export type TextGenResponse = {
    text: string[];
};

// EXAPLE RESPONSE DATA - WE CAN GET THE TOTAL NUMBER OF TOKENS HERE AND COMPUTE CHARGES

// data: {
//     2023-03-25 22:32:40     id: 'cmpl-6xwQM7e4ct29js9UaK2aRr15e0uf5',
//     2023-03-25 22:32:40     object: 'text_completion',
//     2023-03-25 22:32:40     created: 1679743954,
//     2023-03-25 22:32:40     model: 'text-davinci-003',
//     2023-03-25 22:32:40     choices: [ [Object] ],
//     2023-03-25 22:32:40     usage: { prompt_tokens: 25, completion_tokens: 135, total_tokens: 160 }
//     2023-03-25 22:32:40   }

// TODO: make configurable
// models are available here: https://platform.openai.com/docs/models/gpt-4
const models = ['text-davinci-003', 'gpt-3.5-turbo'];

// TODO: research and configure - though these seem to work alright
const requestDefault = {
    model: models[0],
    max_tokens: 2048,
    temperature: 0.7,
    presence_penalty: 0.6
};

export default async function requestNewGeneratedText(prompt: string, account: Account): Promise<(string | undefined)[]> {
    const createCompletionRequest: CreateCompletionRequest = { prompt, ...requestDefault };
    try {
        const response = await openApiClient.createCompletion(createCompletionRequest);
        const data = response.data;
        const choices = data.choices as CreateCompletionResponseChoicesInner[];
        const usage = data.usage as any;
        const totalTokens = usage.total_tokens;

        await UpdateUsage(totalTokens, account)

        const text: string[] = [];
        choices.forEach(x => {
            if (x !== undefined && x.text !== undefined && x.text !== null) {
                text.push(x.text);
            }
        })
        return text;
    } catch (err) {
        Logger.error({ message: err as string });
        return Promise.resolve(["FAILED WITH ERROR" + err] as string[]);
    }
}