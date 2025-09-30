'use client';

import { InputHTMLAttributes } from 'react';

import { Text } from '@/components/text';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  name?: string;
  placeholder?: string;
  isOptional?: boolean;
  isError?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Input = (props: IProps) => {
  const { title, name, className, placeholder, isOptional, isError, children, ...rest } = props;

  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      <label className="pl-2" htmlFor={name}>
        <Text.HEADING text={title} />
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          className={`border-0 border-b-2 border-b-theme-txt-gray ${isError ? 'border-red-500' : ''} ${children ? 'pr-16' : ''}`}
          placeholder={`${placeholder} ${isOptional ? '[선택] ' : ''}`}
          {...rest}
        />
        <div className="absolute right-4 bottom-1/2 translate-y-1/2">{children}</div>
      </div>
    </div>
  );
};
