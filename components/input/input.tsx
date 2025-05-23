'use client';

import { BiPlusCircle } from 'react-icons/bi';

import Text from '@/components/text/text';

interface IProps {
  type: 'text' | 'email' | 'password' | 'date' | 'datetime-local' | 'checkbox';
  title: string;
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  borderColor?: 'gray' | 'green';
  optional?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  isError?: boolean;
  isPlus?: boolean;
  plusClick?: () => void;
  children?: React.ReactNode;
}

const border_color = {
  gray: 'border border-gray-300',
  green: 'border border-green-400',
};

export default function Input(props: IProps) {
  const {
    type,
    title,
    name,
    value,
    defaultValue,
    onChange,
    borderColor = 'gray',
    optional = false,
    className,
    placeholder = '',
    disabled = false,
    required = false,
    onKeyDown,
    isError = false,
    isPlus,
    plusClick,
    children,
  } = props;

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();

    if (onKeyDown) {
      if (event.key === 'Enter') {
        onKeyDown(event);
      }
    }
  };

  const handlePlusClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation();

    if (plusClick) {
      plusClick();
    }
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="pl-2">
        <Text value={title} />
      </div>

      <div className="flex items-center gap-2">
        <input
          className={`w-full ${border_color[borderColor]} ${isError ? 'border-red-500' : ''} ${className}`}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={`${placeholder} ${optional ? '[선택] ' : ''}`}
          disabled={disabled}
          required={required}
          onKeyDown={keyDownHandler}
        />
        {isPlus && <BiPlusCircle className="cursor-pointer" color="#666666" size={24} onClick={handlePlusClick} />}
        {children && <div className="min-w-[80px]">{children}</div>}
      </div>
    </div>
  );
}
