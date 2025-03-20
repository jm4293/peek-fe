import { Text } from '@/components/text';
import { useDeviceLayout } from '@/hooks';

interface IProps {
  type: 'text' | 'email' | 'password' | 'date' | 'datetime-local';
  title: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  borderColor?: 'gray' | 'green';
  optional?: boolean;
  onKeyDown?: () => void;
}

const border_color = {
  gray: 'border border-gray-300',
  green: 'border border-green-400',
};

export const Input = (props: IProps) => {
  const {
    type,
    title,
    value,
    onChange,
    name = '',
    placeholder = '',
    disabled = false,
    borderColor = 'gray',
    optional = false,
    className = '',
    onKeyDown,
  } = props;

  const { isMobile } = useDeviceLayout();

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();

    if (event.key !== 'Enter') {
      return;
    }

    if (onKeyDown) {
      onKeyDown();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Text value={title} color="#000000" />
      <input
        name={name}
        className={`px-3 py-4 ${border_color[borderColor]} ${className}`}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDownHandler}
        placeholder={`${optional ? '[선택] ' : ''}${placeholder}`}
        disabled={disabled}
      />
    </div>
  );
};
