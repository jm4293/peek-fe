'use client';

import { useRef } from 'react';

import { Text } from '../text/Text';

interface IProps {
  title: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  color?: 'gray' | 'green';
  optional?: boolean;
  className?: string;
  required?: boolean;
}

const borderColor = {
  gray: 'border border-gray-300',
  green: 'border border-green-400',
};

export const Textarea = (props: IProps) => {
  const {
    title,
    value,
    defaultValue,
    onChange,
    name = '',
    placeholder = '',
    disabled = false,
    color = 'gray',
    optional = false,
    className,
    required = false,
  } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    onChange?.(event);
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <label className="pl-2" htmlFor={name}>
        <Text.HEADING text={title} />
      </label>

      <textarea
        id={name}
        ref={textareaRef}
        name={name}
        className={`min-h-[20vh] max-h-[60vh] ${borderColor[color]} ${className}`}
        value={value}
        defaultValue={defaultValue}
        onChange={handleInput}
        placeholder={`${optional ? '[선택] ' : ''}${placeholder}`}
        disabled={disabled}
        required={required}
      />
    </div>
  );
};
