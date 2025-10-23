interface IProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  className?: string;
  color?: 'default' | 'gray' | 'blue' | 'red' | 'main';
}

const textColor = {
  default: 'text-theme-txt-default',
  gray: 'text-theme-txt-gray',
  blue: 'text-theme-txt-blue',
  red: 'text-theme-txt-red',
  main: 'text-theme-main-color',
};

const TITLE = (props: IProps) => {
  const { className, text, color = 'default', ...rest } = props;
  return (
    <h1 className={`${textColor[color]} text-lg font-semibold ${className}`} {...rest}>
      {text}
    </h1>
  );
};

const SUBTITLE = (props: IProps) => {
  const { className, text, color = 'default', ...rest } = props;
  return (
    <h2 className={`${textColor[color]} text-lg font-medium ${className}`} {...rest}>
      {text}
    </h2>
  );
};

const HEADING = (props: IProps) => {
  const { className, text, color = 'default', ...rest } = props;
  return (
    <h3 className={`${textColor[color]} text-base font-medium ${className}`} {...rest}>
      {text}
    </h3>
  );
};

const PARAGRAPH = (props: IProps) => {
  const { className, text, color = 'default', ...rest } = props;
  return (
    <p className={`${textColor[color]} text-base font-normal ${className}`} {...rest}>
      {text}
    </p>
  );
};

const CAPTION = (props: IProps) => {
  const { className, text, color = 'default', ...rest } = props;
  return (
    <p className={`${textColor[color]} text-sm font-normal italic ${className}`} {...rest}>
      {text}
    </p>
  );
};

export const Text = {
  TITLE,
  SUBTITLE,
  HEADING,
  PARAGRAPH,
  CAPTION,
};
