import { ChangeEvent } from "react"

export type TextAreaProps = {
  label: string
  onChange(e: TextAreaChangeEvent): void
}

export type TextAreaChangeEvent = ChangeEvent<HTMLTextAreaElement>;

export default function TextArea({ label, onChange }: TextAreaProps) {
  return (
    <div>
      <label
        htmlFor="comment"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          rows={4}
          onChange={onChange}
          name="comment"
          id="comment"
          className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
          defaultValue={''}
        />
      </div>
    </div>
  )
}
