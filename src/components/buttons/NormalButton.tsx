import { Button } from './Button';

export const NormalButton = ({ onClick, disabled, children }: { onClick?: (e: any) => void; disabled?: boolean; children: React.ReactNode }) => {
    return (
        <Button color="slate" variant="solid" disabled={disabled} className="text-text bg-primary m-1 text-lg" onClick={onClick}>
            {children}
        </Button>
    );
};
