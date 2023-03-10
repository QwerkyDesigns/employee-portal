import React from 'react';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';

export default function fourohone() {
    return (
        <div className="items-top relative flex min-h-screen justify-center bg-gray-50 dark:bg-gray-900 sm:items-center sm:pt-0">
            <div className="mx-auto max-w-xl sm:px-6 lg:px-8">
                <div className="flex items-center pt-8 sm:justify-start sm:pt-0">
                    <div className="border-r border-purple-300 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text px-4 text-4xl font-extrabold tracking-wider text-transparent">
                        401
                    </div>
                    <div className="ml-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-4xl font-extrabold uppercase tracking-wider text-transparent">
                        Unauthorised
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) {
    context.res.statusCode = 401;
    return { props: {} };
}
