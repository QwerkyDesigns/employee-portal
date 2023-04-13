import openApiClient from '@/lib/client/openApiClient';
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

export default async function requestNewGeneratedText(prompt: string): Promise<CreateCompletionResponseChoicesInner[]> {
    const createCompletionRequest: CreateCompletionRequest = { prompt, ...requestDefault };
    try {
        console.log(createCompletionRequest);
        const response = await openApiClient.createCompletion(createCompletionRequest);
        const data = response.data.choices as CreateCompletionResponseChoicesInner[];
        Logger.debug({ message: data[0].text ?? '' });
        console.log(data);
        return data;
    } catch (err) {
        Logger.error({ message: err as string });
        return Promise.resolve([] as CreateCompletionResponseChoicesInner[]);
    }
}
