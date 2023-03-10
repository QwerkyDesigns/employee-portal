import { IconArrowBigTop } from '@tabler/icons';
import { Button } from './Button';

export type ButtonWithSpinnerProps = {
    children: React.ReactNode;
    loading?: boolean;
    onClick(): void;
    icon?: React.ReactNode;
    withSpinner?: boolean;
};

export const ButtonWithSpinner = ({ children, loading, onClick, icon, withSpinner = true }: ButtonWithSpinnerProps) => {
    return (
        <Button
            color="slate"
            variant="solid"
            className="text-text bg-primary m-1 text-lg"
            // leftIcon={icon}
            loading={withSpinner ? loading ?? false : false}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};
