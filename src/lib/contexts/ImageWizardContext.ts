import { WizardStep } from '@/components/page/imageWizard';
import { SetState } from '@/types/sharedTypes';
import { createContext } from 'react';

export type TextPrompts = {
    whatDoYouWantToBuild: string;
    whatTypeOfProduct: string;
    whoIsTheProductTargetedAt: string;
    howDoesThisProductStandOut: string;
};

export type ImageWizardContextType = {
    internalSteps: WizardStep[];
    setCurrentSteps: SetState<WizardStep[]> | undefined;
    showProceedButton: boolean;
    setShowProceedButton: SetState<boolean> | undefined;
    textPrompts: TextPrompts;
    setTextPrompts: SetState<TextPrompts> | undefined;
};

const defaultImageWizardContext: ImageWizardContextType = {
    internalSteps: [],
    setCurrentSteps: undefined,
    showProceedButton: false,
    setShowProceedButton: undefined,
    textPrompts: {
        whatDoYouWantToBuild: '',
        whatTypeOfProduct: '',
        whoIsTheProductTargetedAt: '',
        howDoesThisProductStandOut: ''
    },
    setTextPrompts: undefined
};

export const ImageWizardContext = createContext<ImageWizardContextType>(defaultImageWizardContext);
