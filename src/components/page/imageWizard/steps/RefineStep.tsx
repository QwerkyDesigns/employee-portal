import { Button } from '@/components/buttons/Button';
import TextArea from '@/components/text/TextArea';
import frontendClient from '@/lib/client/frontendClient';
import { ImageWizardContext, ImageWizardContextType } from '@/lib/contexts/ImageWizardContext';
import { useContext, useEffect, useState } from 'react';

type RefinementIdea = {
    text: string;
};

export const RefineStep = () => {
    const [refinementIdeas, setRefinementIdeas] = useState<RefinementIdea[]>([]);

    const { compilePrompt, textPrompts, setTextPrompts } = useContext<ImageWizardContextType>(ImageWizardContext);

    useEffect(() => {
        if (compilePrompt && setTextPrompts) {
            const currentPrompt = compilePrompt();
            setTextPrompts((cur) => {
                return { ...cur, finalPrompt: currentPrompt };
            });
        }
    }, []);

    const refineOnClick = async () => {
        const response = await frontendClient.post<{}, {}>('refine/text', { prompt });
        setRefinementIdeas([{ text: 'wow what a great idea!' }, { text: 'omfg another ideas!' }]);
    };

    const refinedOptionOnClick = (value: string) => {
        if (setTextPrompts) {
            setTextPrompts((cur) => {
                return { ...cur, finalPrompt: value };
            });
        }
    };

    const manualUpdateFinalPrompt = (e: any) => {
        if (setTextPrompts) {
            setTextPrompts((cur) => {
                return { ...cur, finalPrompt: e.target.value };
            });
        }
    };

    return (
        <div className="mt-24 flex h-full flex-row">
            <div className="h-full w-1/2">
                <TextArea
                    label='Here is your crafted prompt! If you"d like to refine it before submitting, you can do that here'
                    value={textPrompts.finalPrompt}
                    onChange={manualUpdateFinalPrompt}
                />
                <Button className="mt-3" onClick={refineOnClick}>
                    Refine
                </Button>
            </div>
            <div className="ml-2 border-l-2" />
            <div className="h-full w-1/2">
                <ul role="list" className="divide-y divide-gray-200">
                    {refinementIdeas.length > 0 ? (
                        refinementIdeas.map((idea) => (
                            <li key={idea.text} className="flex py-4 hover:bg-slate-100" onClick={() => refinedOptionOnClick(idea.text)}>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">{idea.text}</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <div className="flex w-full items-center text-center">No refinement options created... yet!</div>
                    )}
                </ul>
            </div>
        </div>
    );
};
