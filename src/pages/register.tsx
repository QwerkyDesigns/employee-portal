import { AuthLayout } from '@/components/landing/AuthLayout';
import { TextField } from '@/components/landing/Fields';
import { Button } from '@/components/buttons/Button';
import Head from 'next/head';
import Link from 'next/link';
import { APP_NAME } from '../lib/constants';
import { useState } from 'react';
import frontendClient from '@/lib/client/frontendClient';
import { RegistrationPayload, RegistrationRequest, RegistrationResponse } from '@/lib/controllers/RegisterAccountController';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

export default function Register() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const onEmailChange = (e: any) => {
        setEmail(e.target.value);
    };
    const onPasswordChange = (e: any) => {
        setPassword(e.target.value);
    };

    const submitRego = async (e: any) => {
        e.preventDefault();
        const payload: RegistrationPayload = {
            email,
            password
        };

        const response = await frontendClient.post<RegistrationRequest, RegistrationResponse>('account/register', payload);

        if (response.isSuccess) {
            await signIn('credentials', {callbackUrl: `${window.location.origin}/portal`});
            //perhaps a router.push('/login'); or push to a confirmation page - where they will provide an emailed token
        }
    };

    return (
        <>
            <Head>
                <title>{`Sign Up - ${APP_NAME}`} </title>
            </Head>
            <AuthLayout>
                <div className="flex flex-col">
                    <Link href="/" aria-label="Home">
                        <h1 className="font-extrabold">Qwerky Studio</h1>
                    </Link>
                    <div className="mt-20">
                        <h2 className="text-lg font-semibold text-gray-900">Get started for free</h2>
                        <p className="mt-2 text-sm text-gray-700">
                            Already registered?{' '}
                            <Link href="/login" className="font-medium text-blue-600 hover:underline">
                                Sign in
                            </Link>{' '}
                            to your account.
                        </p>
                    </div>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2">
                    <TextField
                        onChange={onEmailChange}
                        className="col-span-full"
                        label="Email address"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                    />
                    <TextField
                        onChange={onPasswordChange}
                        className="col-span-full"
                        label="Password"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                    />
                    <div className="col-span-full">
                        <Button onClick={submitRego} type="submit" variant="solid" color="blue" className="w-full">
                            <span>
                                Sign up <span aria-hidden="true">&rarr;</span>
                            </span>
                        </Button>
                    </div>
                </div>
            </AuthLayout>
        </>
    );
}
