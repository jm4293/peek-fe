'use client';

import { InputHTMLAttributes } from 'react';

import { Text } from '@/components/text';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  options: { value: string; label: string }[];
  title?: string;
  placeholder?: string;
  isOptional?: boolean;
  isError?: boolean;
  className?: string;
}

export const Datalist = (props: Props) => {
  const { title, name, className, placeholder, isOptional, isError, ...rest } = props;

  const datalistId = `${name}-datalist`;

  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      {title && (
        <label className="pl-2" htmlFor={name}>
          <Text.HEADING text={title} />
        </label>
      )}

      <input
        list={datalistId}
        id={name}
        name={name}
        className={`border-b-theme-txt-gray ${isError ? 'border-red-500' : ''}`}
        placeholder={`${placeholder ?? title} ${isOptional ? '[선택] ' : ''}`}
        {...rest}
      />

      <datalist id={datalistId}>
        {props.options.map((cur) => (
          <option key={cur.label} value={cur.label} />
        ))}
      </datalist>
    </div>
  );
};
