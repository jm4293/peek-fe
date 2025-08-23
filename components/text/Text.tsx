interface IProps {
  text: string;
  className?: string;
  color?: 'default' | 'gray' | 'blue' | 'red';
}

const textColor = {
  default: 'text-theme-txt-default',
  gray: 'text-theme-txt-gray',
  blue: 'text-theme-txt-blue',
  red: 'text-theme-txt-red',
};

const TITLE = (props: IProps) => {
  const { className, text, color = 'default' } = props;
  return <h1 className={`${textColor[color]} text-xl font-semibold ${className}`}>{text}</h1>;
};

const SUBTITLE = (props: IProps) => {
  const { className, text, color = 'default' } = props;
  return <h2 className={`${textColor[color]} text-lg font-medium ${className}`}>{text}</h2>;
};

const HEADING = (props: IProps) => {
  const { className, text, color = 'default' } = props;
  return <h3 className={`${textColor[color]} text-base font-medium ${className}`}>{text}</h3>;
};

const PARAGRAPH = (props: IProps) => {
  const { className, text, color = 'default' } = props;
  return <p className={`${textColor[color]} text-sm ${className}`}>{text}</p>;
};

const CAPTION = (props: IProps) => {
  const { className, text, color = 'default' } = props;
  return <span className={`${textColor[color]} text-xs italic ${className}`}>{text}</span>;
};

export const Text = {
  TITLE,
  SUBTITLE,
  HEADING,
  PARAGRAPH,
  CAPTION,
};
