import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';

export type TextInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?: string;
    value: string;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
};

export type TextInputChangeEvent = ChangeEvent<HTMLTextAreaElement>;

export default function TextInput({ label, value, onChange, ...rest }: TextInputProps) {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
                    {label}
                </label>
            )}
            <div className="mt-2">
                <input
                    value={value}
                    onChange={onChange}
                    name="comment"
                    id="comment"
                    className="block w-full rounded-md border-0 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                    {...rest}
                />
            </div>
        </div>
    );
}
