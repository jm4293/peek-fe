interface IProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  className?: string;
  color?: 'default' | 'gray' | 'blue' | 'red' | 'main';
  nowrap?: boolean;
}

const textColor = {
  default: 'text-theme-txt-default',
  gray: 'text-theme-txt-gray',
  blue: 'text-theme-txt-blue',
  red: 'text-theme-txt-red',
  main: 'text-theme-main-color',
};

const TITLE = (props: IProps) => {
  const { className, text, color = 'default', nowrap } = props;
  return (
    <h1 className={`${textColor[color]} text-xl font-semibold ${className} ${nowrap ? 'whitespace-nowrap' : ''}`}>
      {text}
    </h1>
  );
};

const SUBTITLE = (props: IProps) => {
  const { className, text, color = 'default', nowrap } = props;
  return (
    <h2 className={`${textColor[color]} text-lg font-medium ${className} ${nowrap ? 'whitespace-nowrap' : ''}`}>
      {text}
    </h2>
  );
};

const HEADING = (props: IProps) => {
  const { className, text, color = 'default', nowrap } = props;
  return (
    <h3 className={`${textColor[color]} text-base font-medium ${className} ${nowrap ? 'whitespace-nowrap' : ''}`}>
      {text}
    </h3>
  );
};

const PARAGRAPH = (props: IProps) => {
  const { className, text, color = 'default', nowrap } = props;
  return <p className={`${textColor[color]} text-sm ${className} ${nowrap ? 'whitespace-nowrap' : ''}`}>{text}</p>;
};

const CAPTION = (props: IProps) => {
  const { className, text, color = 'default', nowrap } = props;
  return (
    <span className={`${textColor[color]} text-xs italic ${className} ${nowrap ? 'whitespace-nowrap' : ''}`}>
      {text}
    </span>
  );
};

export const Text = {
  TITLE,
  SUBTITLE,
  HEADING,
  PARAGRAPH,
  CAPTION,
};
