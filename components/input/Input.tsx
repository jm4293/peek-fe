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
          className={`w-full pl-4 ${children ? 'pr-16' : 'pr-4'} py-3 rounded-xl border ${
            isError ? 'border-red-500' : 'border-theme-border-light/50 dark:border-white/10'
          } bg-theme-bg-card/30 dark:bg-[#1f1f22]/30 backdrop-blur-md text-theme-txt-default placeholder:text-theme-txt-gray focus:outline-none focus:ring-2 focus:ring-theme-main-color/20 focus:border-theme-main-color transition-all duration-200 shadow-lg shadow-black/5 dark:shadow-black/20`}
          placeholder={`${isOptional ? '[선택] ' : ''}${placeholder ?? label}`}
          {...rest}
        />
        {helperText && <Text.PARAGRAPH text={helperText} color="gray" className="mt-2" />}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">{children}</div>
      </div>
    </div>
  );
});

Input.displayName = 'Input';
