import { WizardStep } from '@/components/page/imageWizard';
import { SetState } from '@/types/sharedTypes';
import { createContext } from 'react';

export type ImageWizardContextType = {
    internalSteps: WizardStep[];
    setCurrentSteps: SetState<WizardStep[]> | undefined;
};

const defaultImageWizardContext: ImageWizardContextType = {
    internalSteps: [],
    setCurrentSteps: undefined
};

export const ImageWizardContext = createContext<ImageWizardContextType>(defaultImageWizardContext);
