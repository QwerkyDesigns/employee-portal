import Image from 'next/image';

import Container from '../container/Container';

const faqs = [
    [
        {
            question: 'Can I create artwork for my products?',
            answer: 'Absolutely! Our intuitive interface makes it easy to create high-quality designs for any product.'
        }
    ],
    [
        {
            question: 'Can I export my artwork directly to my online store for creating products?',
            answer: 'You bet! With Qwerky Studio, you can export your designs directly to your online store, so you can start selling your products right away.'
        }
    ],
    [
        {
            question: 'How do I create artwork in Qwerky Studio?',
            answer: 'Creating artwork in Qwerky Studio is easy! Just use our image generation wizard to create your design, and our team will provide you with tips and tricks for making your product stand out.'
        }
    ]
];

export function Faqs() {
    return (
        <section id="faq" aria-labelledby="faq-title" className="relative overflow-hidden bg-slate-50 py-20 sm:py-32">
            <Image
                className="absolute top-0 left-1/2 max-w-none translate-x-[-30%] -translate-y-1/4"
                src={'/images/background-faqs.jpg'}
                alt=""
                width={1558}
                height={946}
                unoptimized
            />
            <Container className="relative">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 id="faq-title" className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
                        Frequently asked questions
                    </h2>
                    <p className="mt-4 text-lg tracking-tight text-slate-700">
                        If you can’t find what you’re looking for, email our support team and if you’re lucky someone will get back to you.
                    </p>
                </div>
                <ul role="list" className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
                    {faqs.map((column, columnIndex) => (
                        <li key={columnIndex}>
                            <ul role="list" className="flex flex-col gap-y-8">
                                {column.map((faq, faqIndex) => (
                                    <li key={faqIndex}>
                                        <h3 className="font-display text-lg leading-7 text-slate-900">{faq.question}</h3>
                                        <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
