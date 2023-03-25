import openApiClient from '@/lib/client/openApiClient';
import { CreateCompletionRequest } from 'openai';

export type TextGenResponse = {
    text: string[];
};

const currentModel = 'gpt-3.5-turbo'; // TODO: make configurable

// models are available here: https://platform.openai.com/docs/models/gpt-4
export default async function requestNewGeneratedText(prompt: string): Promise<string[]> {
    const createCompletionRequest: CreateCompletionRequest = { prompt, model: currentModel };

    console.log("AGOUT TO SEND THE TEXT REAUSTSET")
    const response = await openApiClient.createCompletion(createCompletionRequest);
    console.log('-----------------------');
    console.log(response);
    console.log(response.data);
    console.log(response.data.choices);
    return response.data.choices.map((x) => x.text ?? '').filter((x) => x !== '');
}
