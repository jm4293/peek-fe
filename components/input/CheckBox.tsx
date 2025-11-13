import { Text } from '@/components/text';

interface Props {
  title: string;
  name: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const CheckBox = (props: Props) => {
  const { title, name, checked, onChange, className } = props;

  return (
    <div className="flex items-center gap-2">
      <input
        id={name}
        className={`border border-gray-300 ${className}`}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={name}>
        <Text.HEADING text={title} className="whitespace-nowrap" />
      </label>
    </div>
  );
};
