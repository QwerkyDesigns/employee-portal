import clsx from 'clsx';
import React, { FC, useContext, useState } from 'react';
import { ArtStyles, ImageWizardContext, ImageWizardContextType, TextPrompts } from '@/lib/contexts/ImageWizardContext';
import { CheckIcon } from '@heroicons/react/24/solid';
import { ArtistStyleMeta, SetState } from '@/types/sharedTypes';
import { InitialStep } from './steps/InitialStep';
import { RefineStep } from './steps/RefineStep';
import { ReviewStep } from './steps/ReviewStep';
import { Button } from '@/components/buttons/Button';
import Container from '@/components/container/Container';
import { ChooseArtStyle } from './steps/ChooseArtStyle';

enum Status {
    incomplete,
    current,
    completed
}

export type WizardStep = {
    id: number;
    name: string | any;
    summary: string;
    status: Status;
};
const wizardSteps: WizardStep[] = [
    {
        id: 0,
        name: 'Initial',
        summary: "Provide a simple description of what you'd like to create. We'll refine this if necessary",
        status: Status.incomplete
    },
    {
        id: 1,
        name: 'Choose Art Styles',
        summary: 'You can make your artwork in the style of well known artists',
        status: Status.incomplete
    },

    {
        id: 2,
        name: 'Refine',
        summary: "The image generation process isn't perfect, and sometimes we need to give it additional information",
        status: Status.incomplete
    },

    {
        id: 3,
        name: 'Review',
        summary:
            "Lets have a look at your results! You may select from these some actions to take, such as publish to your storefront. You'll be able to review these later as well.",
        status: Status.incomplete
    }
];

type WizardStepProps = {
    wizardStep: WizardStep;
    isActive: boolean;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const WizardStep: FC<WizardStepProps> = ({ wizardStep, isActive, className, ...props }) => {
    return (
        <div className={clsx(className, !isActive && 'opacity-75 hover:opacity-100')} {...props}>
            <h3 className={clsx('mt-6 text-sm font-medium', isActive ? 'text-blue-600' : 'text-slate-600')}>{wizardStep.name}</h3>
            <p className="mt-2 font-display text-xl text-slate-900">{wizardStep.summary}</p>
        </div>
    );
};

type BaseWizardProps = {
    wizardSteps: WizardStep[];
};

type WizardProps = BaseWizardProps & {
    currentStep: number;
    setCurrentStep: SetState<number>;
    setCurrentSteps: SetState<WizardStep[]>;
};

function WizardMobile({ wizardSteps }: BaseWizardProps) {
    return (
        <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
            {wizardSteps.map((wizardStep) => (
                <div key={wizardStep.name}>
                    <WizardStep wizardStep={wizardStep} className="mx-auto max-w-2xl" isActive />
                    <div className="relative mt-10 pb-10">
                        <div className="absolute -inset-x-4 bottom-0 top-8 bg-slate-200 sm:-inset-x-6" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function WizardDesktop({ wizardSteps, currentStep, setCurrentStep, setCurrentSteps }: WizardProps) {
    const { showProceedButton } = useContext<ImageWizardContextType>(ImageWizardContext);

    return (
        <>
            <nav aria-label="Progress">
                <ol role="list" className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0">
                    {wizardSteps.map((step, stepIdx) => {
                        const shouldDisable = !showProceedButton;
                        return (
                            <li key={step.name} className={`relative md:flex md:flex-1`}>
                                {step.status === Status.completed ? (
                                    <a
                                        onClick={() => setCurrentStep(stepIdx)}
                                        className={`group flex w-full items-center ${shouldDisable ? 'pointer-events-none' : ''}`}
                                    >
                                        <span className="flex items-center px-6 py-4 text-sm font-medium">
                                            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                                                <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </span>
                                            <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
                                        </span>
                                    </a>
                                ) : step.status === Status.current ? (
                                    <a
                                        onClick={() => setCurrentStep(stepIdx)}
                                        className={`flex items-center px-6 py-4 text-sm font-medium ${shouldDisable ? 'pointer-events-none' : ''}`}
                                        aria-current="step"
                                    >
                                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-4 border-indigo-600">
                                            <span className=" text-indigo-600">{step.id}</span>
                                        </span>
                                        <span className="ml-4 text-sm text-indigo-600 ">{step.name}</span>
                                    </a>
                                ) : (
                                    <a
                                        onClick={() => setCurrentStep(stepIdx)}
                                        className={`group flex w-full items-center ${shouldDisable ? 'pointer-events-none' : ''}`}
                                    >
                                        <span className="flex items-center px-6 py-4 text-sm font-medium">
                                            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                                                <span className="text-gray-500 group-hover:text-gray-900">{step.id}</span>
                                            </span>
                                            <span className="ml-4 text-sm font-extrabold text-gray-500 underline group-hover:text-gray-900">{step.name}</span>
                                        </span>
                                    </a>
                                )}

                                {stepIdx !== wizardSteps.length - 1 ? (
                                    <>
                                        {/* Arrow separator for lg screens and up */}
                                        <div className="absolute top-0 right-0 hidden h-full w-5 md:block" aria-hidden="true">
                                            <svg className="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                                                <path d="M0 -2L20 40L0 82" vectorEffect="non-scaling-stroke" stroke="currentcolor" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </>
                                ) : null}
                            </li>
                        );
                    })}
                </ol>
            </nav>
            <section className="flex-between m-3 flex flex-row">
                {currentStep > 0 ? (
                    <div>
                        <Button
                            onClick={() => {
                                if (currentStep == 0) return;
                                setCurrentStep((cur) => {
                                    if (cur === 0) {
                                        return cur;
                                    }
                                    const back = cur - 1;
                                    return back;
                                });
                            }}
                        >
                            Back
                        </Button>
                    </div>
                ) : (
                    <div />
                )}
                <div className="flex-1" />
                {currentStep < wizardSteps.length && showProceedButton ? (
                    <div>
                        <Button
                            onClick={() => {
                                console.log(currentStep);
                                console.log(wizardSteps.length);
                                if (currentStep >= wizardSteps.length) return;

                                const current = wizardSteps[currentStep];
                                current.status = Status.completed;
                                if (setCurrentSteps !== undefined) {
                                    setCurrentSteps([...wizardSteps, current]);
                                    setCurrentStep((cur) => {
                                        if (cur === wizardSteps.length) {
                                            return cur;
                                        }
                                        const next = cur + 1;
                                        return next;
                                    });
                                }
                            }}
                        >
                            Proceed
                        </Button>
                    </div>
                ) : (
                    <div />
                )}
            </section>
            <section>
                {currentStep === 0 && <InitialStep />}
                {currentStep === 1 && <ChooseArtStyle />}
                {currentStep === 2 && <RefineStep />}
                {currentStep === 3 && <ReviewStep />}
            </section>
        </>
    );
}

export function ImageCreationWizard() {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [currentSteps, setCurrentSteps] = useState<WizardStep[]>([...wizardSteps]);
    const [showProceedButton, setShowProceedButton] = useState<boolean>(false);
    const [textPrompts, setTextPrompts] = useState<TextPrompts>({
        whatDoYouWantToBuild: '',
        whatTypeOfProduct: '',
        whoIsTheProductTargetedAt: '',
        howDoesThisProductStandOut: '',
        finalPrompt: ''
    });
    const [artStyles, setArtStyles] = useState<ArtStyles>({
        style: '',
        artist: undefined
    });

    const compilePrompt = () => {
        return textPrompts.whatDoYouWantToBuild;
    };

    return (
        <ImageWizardContext.Provider
            value={{
                internalSteps: currentSteps,
                setCurrentSteps,
                showProceedButton,
                setShowProceedButton,
                textPrompts,
                setTextPrompts,
                artStyles,
                setArtStyles,
                compilePrompt
            }}
        >
            <Container>
                <div className="mx-auto max-w-2xl md:text-center">
                    <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">Lets create some new artwork</h2>
                </div>
                <WizardMobile wizardSteps={wizardSteps} />
                <WizardDesktop wizardSteps={wizardSteps} currentStep={currentStep} setCurrentStep={setCurrentStep} setCurrentSteps={setCurrentSteps} />
            </Container>
        </ImageWizardContext.Provider>
    );
}
