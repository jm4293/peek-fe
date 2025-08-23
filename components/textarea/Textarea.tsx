'use client';

import { TextareaHTMLAttributes, useRef } from 'react';

import { Text } from '../text/Text';

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  title: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  placeholder?: string;
  color?: 'gray' | 'green';
  optional?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const borderColor = {
  gray: 'border border-gray-300',
  green: 'border border-green-400',
};

export const Textarea = (props: IProps) => {
  const { title, onChange, name = '', placeholder = '', color = 'gray', optional = false, className, ...rest } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    onChange?.(event);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="pl-2" htmlFor={name}>
        <Text.HEADING text={title} />
      </label>

      <textarea
        id={name}
        ref={textareaRef}
        className={`border-theme-txt-gray  min-h-[20vh] max-h-[60vh] ${borderColor[color]} ${className}`}
        onChange={handleInput}
        placeholder={`${optional ? '[선택] ' : ''}${placeholder}`}
        {...rest}
      />
    </div>
  );
};
