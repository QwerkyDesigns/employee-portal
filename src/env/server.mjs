// @ts-check
/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { serverSchema } from './schema.mjs';
import { env as clientEnv, formatErrors } from './client.mjs';

// console.log(process.env);
const _serverEnv = serverSchema.safeParse(process.env);
console.log(_serverEnv);
if (_serverEnv.success === false) {
    console.error('❌ Invalid environment variables:\n', ...formatErrors(_serverEnv.error.format()));
    _serverEnv.error.issues.map((e) => {
        // @ts-ignore
        console.error(`Received: ${e.received}, Expected: ${e.expected}, because: ${e.code} for ${e.path}`);
    });
    throw new Error('Invalid environment variables');
}

/**
 * Validate that server-side environment variables are not exposed to the client.
 */
for (let key of Object.keys(_serverEnv.data)) {
    if (key.startsWith('NEXT_PUBLIC_')) {
        console.warn('❌ You are exposing a server-side env-variable:', key);
        throw new Error('You are exposing a server-side env-variable');
    }
}

export const env = { ..._serverEnv.data, ...clientEnv };
