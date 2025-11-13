import React from 'react';

interface Props extends React.HTMLAttributes<HTMLElement> {
  text: string | undefined | null;
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

const TITLE = (props: Props) => {
  const { className, text, color = 'default', ...rest } = props;
  return (
    <h1 className={`text-xl font-semibold ${textColor[color]} ${className}`} {...rest}>
      {text}
    </h1>
  );
};

const SUBTITLE = (props: Props) => {
  const { className, text, color = 'default', ...rest } = props;
  return (
    <h2 className={`text-lg font-medium ${textColor[color]} ${className}`} {...rest}>
      {text}
    </h2>
  );
};

const HEADING = (props: Props) => {
  const { className, text, color = 'default', ...rest } = props;
  return (
    <h3 className={`text-base font-medium ${textColor[color]} ${className}`} {...rest}>
      {text}
    </h3>
  );
};

const PARAGRAPH = (props: Props) => {
  const { className, text, color = 'default', ...rest } = props;
  return (
    <p className={`text-sm ${textColor[color]} ${className}`} {...rest}>
      {text}
    </p>
  );
};

const CAPTION = (props: Props) => {
  const { className, text, color = 'default', ...rest } = props;
  return (
    <p className={`text-xs italic ${textColor[color]} ${className}`} {...rest}>
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
