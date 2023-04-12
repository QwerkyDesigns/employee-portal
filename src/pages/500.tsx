import Link from 'next/link';

export default function ServerError() {
    return (
        <main className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8">
            <p className="text-base font-semibold leading-8 text-indigo-600">500</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Internal Error</h1>
            <p className="mt-6 ml-3 leading-7 tracking-tight text-gray-600">. . . please accept our deepest appologies</p>
            <div className="mt-10">
                <Link href="/" className="text-sm font-semibold leading-7 text-indigo-600">
                    <span aria-hidden="true">&larr;</span> Back to home
                </Link>
            </div>
        </main>
    );
}
