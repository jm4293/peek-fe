'use client';

import Text from '@/components/text/text';

interface IProps {
  type: 'text' | 'email' | 'password' | 'date' | 'datetime-local';
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
  onKeyDown?: () => void;
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
    placeholder,
    disabled = false,
    required = false,
    onKeyDown,
  } = props;

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();

    if (onKeyDown) {
      if (event.key === 'Enter') {
        onKeyDown();
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Text value={title} color="#000000" />
      <input
        className={`${border_color[borderColor]} ${className}`}
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
    </div>
  );
}
