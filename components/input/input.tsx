import Text from '@/components/text/text';

interface IProps {
  type: 'text' | 'email' | 'password' | 'date' | 'datetime-local';
  title: string;
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  borderColor?: 'gray' | 'green';
  optional?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
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
    onChange,
    borderColor = 'gray',
    optional = false,
    className,
    placeholder,
    disabled = false,
    required = false,
    onKeyDown,
  } = props;

  return (
    <div className="flex flex-col gap-3">
      <Text value={title} color="#000000" />
      <input
        className={`px-3 py-4 ${border_color[borderColor]} ${className}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={`${placeholder} ${optional ? '[선택] ' : ''}`}
        disabled={disabled}
        required={required}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
