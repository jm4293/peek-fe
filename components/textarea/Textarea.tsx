'use client';

import { TextareaHTMLAttributes, useRef } from 'react';

import { Text } from '../text/Text';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  placeholder?: string;
  isOptional?: boolean;
  isError?: boolean;
  className?: string;
}

export const Textarea = (props: Props) => {
  const { name, label, onChange, placeholder, isOptional, isError, className, ...rest } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    onChange?.(event);
  };

  return (
    <div className={`w-full flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="pl-2" htmlFor={name}>
          <Text.HEADING text={label} />
        </label>
      )}
      <textarea
        id={name}
        name={name}
        ref={textareaRef}
        className={`w-full pl-4 pr-4 py-3 rounded-xl border ${
          isError ? 'border-red-500' : 'border-theme-border-light/50 dark:border-white/10'
        } bg-theme-bg-card/30 dark:bg-[#1f1f22]/30 backdrop-blur-md text-theme-txt-default placeholder:text-theme-txt-gray focus:outline-none focus:ring-2 focus:ring-theme-main-color/20 focus:border-theme-main-color transition-all duration-200 shadow-lg shadow-black/5 dark:shadow-black/20 min-h-[20vh] max-h-[60vh] resize-none`}
        onChange={handleInput}
        placeholder={`${isOptional ? '[선택] ' : ''}${placeholder}`}
        {...rest}
      />
    </div>
  );
};
