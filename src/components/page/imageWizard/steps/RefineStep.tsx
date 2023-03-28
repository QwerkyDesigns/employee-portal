import { ButtonWithSpinner } from '@/components/buttons/ButtonWithSpinner';
import Select from '@/components/select/Select';
import TextArea from '@/components/text/TextArea';
import frontendClient from '@/lib/client/frontendClient';
import { ImageWizardContext, ImageWizardContextType } from '@/lib/contexts/ImageWizardContext';
import { GenerateTextRequest, GenerateTextResponse } from '@/lib/controllers/GenerateIdeasController';
import { useContext, useEffect, useState } from 'react';

type RefinementIdea = {
    text: string;
};

const modifierText = (n: number) =>
    `I'm generating prompts for online ai image generators. These usually need to be relatively detailed in their descriptions. Considering this, provide ${n} original alternatives that satisfy these criteria. : `;

export const RefineStep = () => {
    const [refinementIdeas, setRefinementIdeas] = useState<RefinementIdea[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { compilePrompt, textPrompts, setTextPrompts } = useContext<ImageWizardContextType>(ImageWizardContext);
    const [n, setN] = useState<number>(1);
    useEffect(() => {
        if (compilePrompt && setTextPrompts) {
            const currentPrompt = compilePrompt();
            setTextPrompts((cur) => {
                return { ...cur, finalPrompt: currentPrompt };
            });
        }
    }, [compilePrompt, setTextPrompts]);

    const refineOnClick = async () => {
        setLoading(true);
        try {
            if (compilePrompt && compilePrompt() !== '') {
                const { choices } = await frontendClient.post<GenerateTextRequest, GenerateTextResponse>('create/text-completion', {
                    prompt: modifierText(n) + compilePrompt()
                });
                const lines: RefinementIdea[] = choices[0]
                    .split('\n')
                    .filter((x) => parseInt(x.split('.')[0]).toString() !== 'NaN')
                    .map(
                        (x) =>
                            ({
                                text: x
                            } as RefinementIdea)
                    );
                setRefinementIdeas(lines);
            }
        } catch {
            // do nothing
        } finally {
            setLoading(false);
        }
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
                    label="Here is your crafted prompt! If you would like to refine it before submitting, you can do that here"
                    value={textPrompts.finalPrompt}
                    onChange={manualUpdateFinalPrompt}
                />
                <div className="flex flex-row items-center justify-between">
                    <ButtonWithSpinner className="mt-3" onClick={refineOnClick} loading={loading}>
                        Refine
                    </ButtonWithSpinner>
                    <Select
                        label="How many suggestions would you like?"
                        value={n}
                        options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                        onChange={(e) => setN(parseInt(e.target.value))}
                    />{' '}
                </div>
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
