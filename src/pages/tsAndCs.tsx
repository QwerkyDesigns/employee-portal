import Link from 'next/link';

const areas = [
    {
        id: 0,
        title: 'Terms and Conditions',
        href: '/legal/TermsAndConditions',
        description: 'Navigate to learn about our Terms and Conditions'
    },
    {
        id: 1,
        title: 'Privacy Policy',
        href: '/legal/PrivacyPolicy',
        description: 'Navigate to learn about our Privacy Policy. Spoiler: We value your privacy, because we value our own.'
    },
    {
        id: 2,
        title: 'Cookie Policy',
        href: '/legal/CookiePolicy',
        description: 'Navigate to learn about our Cookie Policy.'
    }
];

export default function TsAndCs() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Company Policies</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">Learn about how we handle your data, and the terms of our services.</p>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {areas.map((area) => (
                        <article key={area.id} className="flex max-w-xl flex-col items-start justify-between">
                            <div className="group relative">
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                    <Link href={area.href}>
                                        <span className="absolute inset-0" />
                                        {area.title}
                                    </Link>
                                </h3>
                                <p className="line-clamp-3 mt-5 text-sm leading-6 text-gray-600">{area.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
                <div className="mt-24" />
                <Link className="mt-24 border-t-2" href="/">
                    Return Home
                </Link>
            </div>
        </div>
    );
}
