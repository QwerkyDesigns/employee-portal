import { Button } from "@mantine/core";
import { IconArrowBigTop } from "@tabler/icons";

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
            className="text-lg text-text bg-primary m-1"
            leftIcon={icon}
            loading={withSpinner ? loading ?? false : false}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};
