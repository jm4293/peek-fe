'use client';

import { TextareaHTMLAttributes, useRef } from 'react';

import { Text } from '../text/Text';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  title?: string;
  placeholder?: string;
  isOptional?: boolean;
  isError?: boolean;
  className?: string;
}

export const Textarea = (props: Props) => {
  const { name, title, onChange, placeholder, isOptional, isError, className, ...rest } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    onChange?.(event);
  };

  return (
    <div className={`w-full flex flex-col gap-1 ${className}`}>
      {title && (
        <label className="pl-2" htmlFor={name}>
          <Text.HEADING text={title} />
        </label>
      )}
      <textarea
        id={name}
        name={name}
        ref={textareaRef}
        className={`border-theme-txt-gray min-h-[20vh] max-h-[60vh] ${isError ? 'border-red-500' : ''}`}
        onChange={handleInput}
        placeholder={`${isOptional ? '[선택] ' : ''}${placeholder}`}
        {...rest}
      />
    </div>
  );
};
