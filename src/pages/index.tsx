import { Faqs } from '@/components/landing/Faqs';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { PrimaryFeatures } from '@/components/landing/PrimaryFeatures';
import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>QwerkyStudio - Creation made easy</title>
                <meta name="description" content="Qwerky Studio is your one stop shop for all things generative AI" />
            </Head>
            <Header />
            <main>
                <Hero />
                <PrimaryFeatures />
                {/* <SecondaryFeatures />
                <CallToAction />
                <Testimonials />
                <Pricing /> */}
                <Faqs />
            </main>
            <Footer />
        </>
    );
}
