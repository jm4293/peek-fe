'use server';

import TextServer from '@/components/text/textServer';

interface IProps {
  type: 'text' | 'email' | 'password' | 'date' | 'datetime-local';
  title: string;
  name: string;
  borderColor?: 'gray' | 'green';
  optional?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const border_color = {
  gray: 'border border-gray-300',
  green: 'border border-green-400',
};

export default async function InputServer(props: IProps) {
  const {
    type,
    title,
    name,
    borderColor = 'gray',
    optional = false,
    className = '',
    placeholder = '',
    disabled = false,
  } = props;

  return (
    <div className="flex flex-col gap-3">
      <TextServer value={title} color="#000000" />
      <input
        name={name}
        className={`px-3 py-4 ${border_color[borderColor]} ${className}`}
        type={type}
        placeholder={`${placeholder} ${optional ? '[선택] ' : ''}`}
        disabled={disabled}
      />
    </div>
  );
}
