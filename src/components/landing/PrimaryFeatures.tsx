import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

import backgroundImage from './images/background-features.jpg';

import wizard from './images/wizard.png';
import upload from './images/upload.png';
import review from './images/review.png';
import send from './images/send.png';
import explode from './images/explode.jpg';

import Container from '../container/Container';

const features: FeatureType[] = [
    {
        title: 'Create',
        description:
            "Use our powerful image generation wizard to easily create custom graphics for your products. Whether you're an artist or a designer, our intuitive interface makes it easy to bring your vision to life.",
        image: wizard,
        imageUrl: undefined
    },
    {
        title: 'Upload',
        description:
            'Manage all of your text generation needs - from copywriting to prompt engineering. With Qwerky Studio, you can upload your own text and use our AI-powered tools to generate engaging content in seconds.',
        image: upload,
        imageUrl: undefined
    },
    {
        title: 'Manage',
        description: 'Manage your artwork from a centralized location. Keep the images you like, archive the rest.',
        image: review,
        imageUrl: undefined
    },
    {
        title: 'Integrate',
        description:
            'Send your artwork wherever you need to - for example, your online store. With Qwerky Studio, you can easily export your designs to your online store or any other platform you choose.',
        image: send,
        imageUrl: undefined
    }
    // {
    //     title: 'Apply your own style',
    //     description: 'Are you an artist? Upload your work and generate images in your own style.',
    //     image: explode,
    //     imageUrl: undefined
    // }
];

type FeatureType = {
    title: string;
    description: string;
    image: StaticImageData | null;
    imageUrl: string | undefined;
};

export function PrimaryFeatures() {
    const [tabOrientation, setTabOrientation] = useState('horizontal');

    useEffect(() => {
        const lgMediaQuery = window.matchMedia('(min-width: 1024px)');

        function onMediaQueryChange({ matches }: { matches: boolean }) {
            setTabOrientation(matches ? 'vertical' : 'horizontal');
        }

        onMediaQueryChange(lgMediaQuery);
        lgMediaQuery.addEventListener('change', onMediaQueryChange);

        return () => {
            lgMediaQuery.removeEventListener('change', onMediaQueryChange);
        };
    }, []);

    return (
        <section id="features" aria-label="Features for running your books" className="relative overflow-hidden bg-blue-600 pt-20 pb-28 sm:py-32">
            <Image
                className="absolute top-1/2 left-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
                src={backgroundImage}
                alt=""
                width={2245}
                height={1636}
                unoptimized
            />
            <Container className="relative">
                <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
                    <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
                        All of your artwork generation needs in one place
                    </h2>
                    {/* <p className="mt-6 text-lg tracking-tight text-blue-100">Every single AI service you could ever want</p> */}
                </div>
                <Tab.Group
                    as="div"
                    className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
                    vertical={tabOrientation === 'vertical'}
                >
                    {({ selectedIndex }) => (
                        <>
                            <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                                <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                                    {features.map((feature, featureIndex) => (
                                        <div
                                            key={feature.title}
                                            className={clsx(
                                                'group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6',
                                                selectedIndex === featureIndex
                                                    ? 'bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10'
                                                    : 'hover:bg-white/10 lg:hover:bg-white/5'
                                            )}
                                        >
                                            <h3>
                                                <Tab
                                                    className={clsx(
                                                        'font-display text-lg [&:not(:focus-visible)]:focus:outline-none',
                                                        selectedIndex === featureIndex
                                                            ? 'text-blue-600 lg:text-white'
                                                            : 'text-blue-100 hover:text-white lg:text-white'
                                                    )}
                                                >
                                                    <span className="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl" />
                                                    {feature.title}
                                                </Tab>
                                            </h3>
                                            <p
                                                className={clsx(
                                                    'mt-2 hidden text-sm lg:block',
                                                    selectedIndex === featureIndex ? 'text-white' : 'text-blue-100 group-hover:text-white'
                                                )}
                                            >
                                                {feature.description}
                                            </p>
                                        </div>
                                    ))}
                                </Tab.List>
                            </div>
                            <Tab.Panels className="lg:col-span-7">
                                {features.map((feature) => (
                                    <Tab.Panel key={feature.title} unmount={false}>
                                        <div className="relative sm:px-6 lg:hidden">
                                            <div className="absolute -inset-x-4 top-[-6.5rem] bottom-[-4.25rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                                            <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">{feature.description}</p>
                                        </div>
                                        <div className="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                                            <Image
                                                className="w-full"
                                                src={feature.image ?? feature.imageUrl ?? ''}
                                                alt=""
                                                priority
                                                sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                                            />
                                        </div>
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </>
                    )}
                </Tab.Group>
            </Container>
        </section>
    );
}
