import { Button } from '@/components/buttons/Button';
import TextArea from '@/components/text/TextArea';
import { ImageWizardContextType, ImageWizardContext, TextPrompts } from '@/lib/contexts/ImageWizardContext';
import { useContext, useEffect, useState } from 'react';

export const InitialStep = () => {
    const { setShowProceedButton, textPrompts, setTextPrompts } = useContext<ImageWizardContextType>(ImageWizardContext);
    useEffect(() => {
        if (setShowProceedButton) {
            setShowProceedButton(
                textPrompts.whatDoYouWantToBuild.length > 0
                // &&
                // textPrompts.whatTypeOfProduct.length > 0 &&
                // textPrompts.whoIsTheProductTargetedAt.length > 0 &&
                // textPrompts.howDoesThisProductStandOut.length > 0
            );
        }
    }, [textPrompts.whatDoYouWantToBuild]); //, textPrompts.whatTypeOfProduct, textPrompts.whoIsTheProductTargetedAt, textPrompts.howDoesThisProductStandOut]);

    return (
        <div aria-label="left side of the screen" className="mx-auto flex w-full flex-col border-r-indigo-400">
            <div className="w-full">
                <div className="mt-12 mb-12 flex w-full flex-col justify-center">
                    <TextArea
                        value={textPrompts.whatDoYouWantToBuild}
                        label="Describe for us what you'd like to create..."
                        onChange={(e) => {
                            if (setTextPrompts) {
                                setTextPrompts((cur) => {
                                    return { ...cur, whatDoYouWantToBuild: e.target.value } as TextPrompts;
                                });
                            }
                        }}
                    />
                    <Button className="float-left m-2 w-1/4">Help me generate ideas</Button>
                </div>
                <div className="mt-12 mb-12 flex w-full justify-center">
                    <TextArea
                        value={textPrompts.whatTypeOfProduct}
                        label="What type of product are you creating?"
                        onChange={(e) => {
                            if (setTextPrompts) {
                                setTextPrompts((cur) => {
                                    return { ...cur, whatTypeOfProduct: e.target.value } as TextPrompts;
                                });
                            }
                        }}
                    />
                </div>
                <div className="mt-12 mb-12 flex w-full justify-center">
                    <TextArea
                        value={textPrompts.whoIsTheProductTargetedAt}
                        label="Who is this product targeted at?"
                        onChange={(e) => {
                            if (setTextPrompts) {
                                setTextPrompts((cur) => {
                                    return { ...cur, whoIsTheProductTargetedAt: e.target.value } as TextPrompts;
                                });
                            }
                        }}
                    />
                </div>
                <div className="mt-12 mb-12 flex w-full justify-center">
                    <TextArea
                        value={textPrompts.howDoesThisProductStandOut}
                        label="How does this product stand out?"
                        onChange={(e) => {
                            if (setTextPrompts) {
                                setTextPrompts((cur) => {
                                    return { ...cur, howDoesThisProductStandOut: e.target.value } as TextPrompts;
                                });
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
