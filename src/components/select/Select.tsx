import React from 'react'

interface Select<T> {
  label?: string
  options: T[]
  defaultValue?: string
  optionValueSelector?(option: object): string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function Select<T extends React.ReactNode>({
  label,
  options,
  defaultValue,
  optionValueSelector,
  onChange,
}: Select<T extends React.ReactNode>) {
  return (
    <div>
      <label
        htmlFor="location"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <select
        id="location"
        name="location"
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {options.map((option, i) => (
          <option key={i}>{optionValueSelector ? optionValueSelector(option) : option}</option>
        ))}
      </select>
    </div>
  )
}
