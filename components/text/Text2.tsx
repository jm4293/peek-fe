interface IProps {
  text: string;
  className?: string;
  color?: 'black' | 'gray' | 'blue' | 'red';
}

const textColor = {
  black: 'text-black',
  gray: 'text-gray-500',
  blue: 'text-blue-500',
  red: 'text-red-500',
};

const TITLE = (props: IProps) => {
  const { className, text, color = 'black' } = props;

  return <h1 className={`${textColor[color]} text-3xl font-semibold ${className ?? ''}`}>{text}</h1>;
};

const SUBTITLE = (props: IProps) => {
  const { className, text, color = 'black' } = props;

  return <h2 className={`${textColor[color]} text-2xl font-medium ${className ?? ''}`}>{text}</h2>;
};

const HEADING = (props: IProps) => {
  const { className, text, color = 'black' } = props;

  return <h3 className={`${textColor[color]} text-base ${className ?? ''}`}>{text}</h3>;
};

const PARAGRAPH = (props: IProps) => {
  const { className, text, color = 'black' } = props;

  return <p className={`${textColor[color]} text-sm ${className ?? ''}`}>{text}</p>;
};

const CAPTION = (props: IProps) => {
  const { className, text, color = 'black' } = props;

  return <span className={`${textColor[color]} text-xs italic ${className ?? ''}`}>{text}</span>;
};

export const Text = {
  TITLE,
  SUBTITLE,
  HEADING,
  PARAGRAPH,
  CAPTION,
};
