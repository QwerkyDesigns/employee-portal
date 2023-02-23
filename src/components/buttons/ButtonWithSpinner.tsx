import { Button } from "@mantine/core";
import { IconArrowBigTop } from "@tabler/icons";

export type ButtonWithSpinnerProps = {
    children: React.ReactNode;
    loading?: boolean;
    onClick(): void;
};

export const ButtonWithSpinner = ({
    children,
    loading,
    onClick,
}: ButtonWithSpinnerProps) => {
    return (
        <Button
            className="text-lg text-text bg-primary m-1"
            leftIcon={<IconArrowBigTop size={14} />}
            loading={loading ?? false}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};
