import { Button } from "@mantine/core";
import { MouseEventHandler } from "react";

export const NormalButton = ({
    onClick,
    disabled,
    children,
}: {
    onClick?: (e: any) => void;
    disabled?: boolean;
    children: React.ReactNode;
}) => {
    // TODO: temp - until style issues are fixed with mantine - or we leave mantine behind :pray:

    return (
        <Button disabled={disabled} className="text-lg text-text bg-primary m-1" onClick={onClick}>
            {children}
        </Button>
    );
};
