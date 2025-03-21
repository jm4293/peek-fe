'use server';

import TextServer from '@/components/text/textServer';

interface IProps {
  title: string;
  value: string;
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

export default async function TextareaServer(props: IProps) {
  const {
    title,
    value,
    name = '',
    placeholder = '',
    disabled = false,
    color = 'gray',
    optional = false,
    className,
  } = props;

  return (
    <div className="flex flex-col gap-3">
      <TextServer value={title} color="#000000" />
      <textarea
        name={name}
        className={`w-full max-h-[60vh] px-3 py-4 ${borderColor[color]} ${className}`}
        value={value}
        placeholder={`${optional ? '[선택] ' : ''}${placeholder}`}
        disabled={disabled}
      />
    </div>
  );
}
