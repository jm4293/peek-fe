import { Text } from '@/components/text';

interface IProps {
  title: string;
  name: string;
  defaultValue?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  isOptional?: boolean;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
}

const TEXT = (props: IProps) => {
  const { title, name, className, placeholder, isOptional, ...rest } = props;

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="pl-2" htmlFor={name}>
        <Text.PARAGRAPH text={title} />
      </label>

      <input
        type="text"
        id={name}
        className={`w-full border border-gray-300 ${className}`}
        name={name}
        placeholder={`${placeholder} ${isOptional ? '[선택] ' : ''}`}
        {...rest}
      />
    </div>
  );
};

const EMAIL = (props: IProps) => {
  const { title, name, className, placeholder, isOptional, ...rest } = props;

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="pl-2" htmlFor={name}>
        <Text.PARAGRAPH text={title} />
      </label>

      <input
        type="email"
        id={name}
        className={`w-full border border-gray-300 ${className}`}
        name={name}
        placeholder={`${placeholder} ${isOptional ? '[선택] ' : ''}`}
        {...rest}
      />
    </div>
  );
};

const PASSWORD = (props: IProps) => {
  const { title, name, className, placeholder, isOptional, ...rest } = props;

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="pl-2" htmlFor={name}>
        <Text.PARAGRAPH text={title} />
      </label>

      <input
        type="password"
        id={name}
        className={`w-full border border-gray-300 ${className}`}
        name={name}
        placeholder={`${placeholder} ${isOptional ? '[선택] ' : ''}`}
        {...rest}
      />
    </div>
  );
};

export const Input = {
  TEXT,
  EMAIL,
  PASSWORD,
};
