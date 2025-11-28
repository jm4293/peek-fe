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
    <div className={`flex items-center gap-3 ${className}`}>
      <input
        id={name}
        className={`w-5 h-5 rounded border ${
          checked
            ? 'border-theme-main-color bg-theme-main-color'
            : 'border-theme-border-light/50 dark:border-white/10 bg-theme-bg-card/30 dark:bg-[#1f1f22]/30'
        } backdrop-blur-md text-theme-main-color focus:outline-none focus:ring-2 focus:ring-theme-main-color/20 focus:border-theme-main-color transition-all duration-200 cursor-pointer shadow-sm shadow-black/5 dark:shadow-black/20`}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={name} className="cursor-pointer">
        <Text.HEADING text={title} className="whitespace-nowrap" />
      </label>
    </div>
  );
};
