import { useEffect, useRef } from 'react';
import Text from '@/components/text/text';

interface IProps {
  title: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  color?: 'gray' | 'green';
  optional?: boolean;
  className?: string;
}

const borderColor = {
  gray: 'border border-gray-300',
  green: 'border border-green-400',
};

export default function Textarea(props: IProps) {
  const {
    title,
    value,
    onChange,
    name = '',
    placeholder = '',
    disabled = false,
    color = 'gray',
    optional = false,
    className,
  } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    onChange(event);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '20vh';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-3">
      <Text value={title} color="#000000" />
      <textarea
        ref={textareaRef}
        name={name}
        className={`w-full max-h-[60vh] px-3 py-4 ${borderColor[color]} ${className}`}
        value={value}
        onChange={handleInput}
        placeholder={`${optional ? '[선택] ' : ''}${placeholder}`}
        disabled={disabled}
      />
    </div>
  );
}
