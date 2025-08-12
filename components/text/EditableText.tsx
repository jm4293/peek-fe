'use client';

interface IProps {
  text: string;
  className?: string;
  color?: 'black' | 'gray' | 'blue' | 'red';
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const textColor = {
  black: 'text-black',
  gray: 'text-gray-500',
  blue: 'text-blue-500',
  red: 'text-red-500',
};

const TITLE = (props: IProps) => {
  const { className, text, color = 'black', onClick } = props;

  return (
    <h1 className={`${textColor[color]} cursor-pointer text-3xl font-semibold ${className ?? ''}`} onClick={onClick}>
      {text}
    </h1>
  );
};

const SUBTITLE = (props: IProps) => {
  const { className, text, color = 'black', onClick } = props;

  return (
    <h2 className={`${textColor[color]} cursor-pointer text-2xl font-medium ${className ?? ''}`} onClick={onClick}>
      {text}
    </h2>
  );
};

const HEADING = (props: IProps) => {
  const { className, text, color = 'black', onClick } = props;

  return (
    <h3 className={`${textColor[color]} cursor-pointer text-base ${className ?? ''}`} onClick={onClick}>
      {text}
    </h3>
  );
};

const PARAGRAPH = (props: IProps) => {
  const { className, text, color = 'black', onClick } = props;

  return (
    <p className={`${textColor[color]} cursor-pointer text-sm ${className ?? ''}`} onClick={onClick}>
      {text}
    </p>
  );
};

const CAPTION = (props: IProps) => {
  const { className, text, color = 'black', onClick } = props;

  return (
    <span className={`${textColor[color]} cursor-pointer text-xs italic ${className ?? ''}`} onClick={onClick}>
      {text}
    </span>
  );
};

export const EditableText = {
  TITLE,
  SUBTITLE,
  HEADING,
  PARAGRAPH,
  CAPTION,
};
