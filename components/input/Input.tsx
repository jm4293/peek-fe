'use client';

import { forwardRef } from 'react';

import { Text } from '@/components/text';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  helperText?: string;
  placeholder?: string;
  isOptional?: boolean;
  isError?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { name, label, helperText, placeholder, isOptional, isError, className, children, ...rest } = props;

  return (
    <div className={`w-full flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="pl-2" htmlFor={name}>
          <Text.HEADING text={label} />
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          id={name}
          name={name}
          className={`border-theme-txt-gray ${isError ? 'border-red-500' : ''} ${children ? 'pr-16' : ''}`}
          placeholder={`${isOptional ? '[선택] ' : ''} ${placeholder ?? label}`}
          {...rest}
        />
        {helperText && <Text.PARAGRAPH text={helperText} color="gray" className="mt-2" />}
        <div className="absolute right-4 bottom-1/2 translate-y-1/2">{children}</div>
      </div>
    </div>
  );
});

Input.displayName = 'Input';
