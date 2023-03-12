import { Configuration, OpenAIApi } from 'openai';
import { env } from '@/env/server.mjs';
const openApiKey = env.OPENAI_API_KEY;
const configuration = new Configuration({
    apiKey: openApiKey
});

const openApiClient = new OpenAIApi(configuration);
export default openApiClient;
