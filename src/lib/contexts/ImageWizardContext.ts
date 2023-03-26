import { WizardStep } from '@/components/page/imageWizard';
import { ArtistStyleMeta, SetState } from '@/types/sharedTypes';
import { createContext } from 'react';

export type TextPrompts = {
    whatDoYouWantToBuild: string;
    whatTypeOfProduct: string;
    whoIsTheProductTargetedAt: string;
    howDoesThisProductStandOut: string;
    finalPrompt: string;
};

export type ArtStyles = {
    style: string;
    artist: ArtistStyleMeta | undefined;
};

export type ImageWizardContextType = {
    internalSteps: WizardStep[];
    setCurrentSteps: SetState<WizardStep[]> | undefined;
    showProceedButton: boolean;
    setShowProceedButton: SetState<boolean> | undefined;
    textPrompts: TextPrompts;
    setTextPrompts: SetState<TextPrompts> | undefined;
    artStyles: ArtStyles;
    setArtStyles: SetState<ArtStyles> | undefined;
    compilePrompt: (() => string) | undefined;
};

const defaultImageWizardContext: ImageWizardContextType = {
    artStyles: {
        style: '',
        artist: undefined
    },
    setArtStyles: undefined,
    internalSteps: [],
    setCurrentSteps: undefined,
    showProceedButton: false,
    setShowProceedButton: undefined,
    textPrompts: {
        whatDoYouWantToBuild: '',
        whatTypeOfProduct: '',
        whoIsTheProductTargetedAt: '',
        howDoesThisProductStandOut: '',
        finalPrompt: ''
    },
    setTextPrompts: undefined,
    compilePrompt: undefined
};

export const ImageWizardContext = createContext<ImageWizardContextType>(defaultImageWizardContext);
