'use client';

import { Text } from '@/components/text';

interface IProps {
  title: string;
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  optional?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  isError?: boolean;
  minLength?: number;
  maxLength?: number;
  children?: React.ReactNode;
}

const TEXT = (props: IProps) => {
  const { title, name, optional = false, className, placeholder, isError = false, children, ...rest } = props;

  return (
    <div className={`w-full flex flex-col gap-1 ${className}`}>
      <label className="pl-2" htmlFor={name}>
        <Text.HEADING text={title} />
      </label>

      <div className={`${children ? 'grid grid-cols-6 gap-4' : ''}`}>
        <input
          id={name}
          className={`w-full border border-gray-300 ${isError ? 'border-red-500' : ''} ${children ? 'col-span-5' : ''}`}
          name={name}
          type="text"
          placeholder={`${placeholder} ${optional ? '[선택] ' : ''}`}
          {...rest}
        />
        {children}
      </div>
    </div>
  );
};

const EMAIL = (props: IProps) => {
  const { title, name, optional = false, className, placeholder, isError = false, children, ...rest } = props;

  return (
    <div className={`w-full flex flex-col gap-1 ${className}`}>
      <label className="pl-2" htmlFor={name}>
        <Text.HEADING text={title} />
      </label>

      <div className={`${children ? 'grid grid-cols-6 gap-4' : ''}`}>
        <input
          id={name}
          className={`w-full border border-gray-300 ${isError ? 'border-red-500' : ''} ${children ? 'col-span-5' : ''}`}
          name={name}
          type="email"
          placeholder={`${placeholder} ${optional ? '[선택] ' : ''}`}
          {...rest}
        />
        {children}
      </div>
    </div>
  );
};

const PASSWORD = (props: IProps) => {
  const { title, name, optional = false, className, placeholder, isError = false, children, ...rest } = props;

  return (
    <div className={`w-full flex flex-col gap-1 ${className}`}>
      <label className="pl-2" htmlFor={name}>
        <Text.HEADING text={title} />
      </label>

      <div className={`${children ? 'grid grid-cols-6 gap-4' : ''}`}>
        <input
          id={name}
          className={`w-full border border-gray-300 ${isError ? 'border-red-500' : ''} ${children ? 'col-span-5' : ''}`}
          name={name}
          type="password"
          placeholder={`${placeholder} ${optional ? '[선택] ' : ''}`}
          {...rest}
        />
        {children}
      </div>
    </div>
  );
};

export const EditableInput = {
  TEXT,
  EMAIL,
  PASSWORD,
};
