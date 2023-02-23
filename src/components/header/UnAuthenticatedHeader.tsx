import { AuthButton } from "../buttons/AuthButton";

export const UnAuthenticatedHeader = () => {
    return (
        <div className="">
            <span className="">You are not signed in</span>
            <div />
            <AuthButton />
        </div>
    );
};
