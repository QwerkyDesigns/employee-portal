import React, { useState } from 'react';
import { Button } from '@/components/buttons/Button';
import { signIn } from 'next-auth/react';
import { CommonProviderOptions } from 'next-auth/providers';
import { TextField } from '@/components/landing/Fields';

function handlePasswordSignin(provider: CommonProviderOptions, emailaddress: string, password: string) {
    return async () => {
        await signIn(provider.id, {
            emailaddress,
            password,
            redirect: true,
            callbackUrl: `${window.location.origin}/portal`
        });
    };
}

export function CredentialsProvider({ provider }: { provider: CommonProviderOptions }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event?.target.value);
    };

    return (
        <div className="mt-10 grid grid-cols-1 gap-y-8">
            <p className="font-extrabold">Sign with {provider.name} </p>
            <TextField
                onChange={handleEmailChange}
                label="Email address"
                id="usernameoremail"
                name="usernameoremail"
                type="text"
                autoComplete="email"
                required
            />
            <TextField onChange={handlePassChange} label="Password" id="password" name="password" type="password" autoComplete="current-password" required />
            <div className="mb-12">
                <Button type="submit" variant="solid" color="blue" className="w-full" onClick={handlePasswordSignin(provider, email, password)}>
                    <span>
                        Sign in <span aria-hidden="true">&rarr;</span>
                    </span>
                </Button>
            </div>
        </div>
    );
}
