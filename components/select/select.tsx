'use client';

import { SelectHTMLAttributes } from 'react';

import { Text } from '../text';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: { value: string; label: string }[];
  title?: string;
  isError?: boolean;
  className?: string;
}

export default function Select(props: Props) {
  const { options, title, name, isError, className, ...rest } = props;

  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      {title && (
        <label className="pl-2" htmlFor={name}>
          <Text.HEADING text={title} />
        </label>
      )}
      <select id={name} name={name} className={`border-b-theme-txt-gray ${isError ? 'border-red-500' : ''}`} {...rest}>
        {options.map((cur) => (
          <option key={cur.value} value={cur.value}>
            {cur.label}
          </option>
        ))}
      </select>
    </div>
  );
}
