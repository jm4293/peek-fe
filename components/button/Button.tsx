'use client';

import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | React.ReactNode;
  color?: 'default' | 'danger';
}

const containerStyles = {
  default: 'bg-theme-main-color hover:bg-theme-main-color-light disabled:bg-theme-main-color/50 active:scale-95',
  danger: 'bg-[#FF5A5F] hover:bg-[#FF7B81] disabled:bg-[#FFB3B8] active:scale-95',
};

const outlineStyles = {
  default:
    'border-theme-main-color hover:bg-theme-main-color/10 dark:hover:bg-theme-main-color/20 hover:border-theme-main-color-light focus:ring-2 focus:ring-theme-main-color/20 focus:border-theme-main-color disabled:bg-theme-main-color/5 dark:disabled:bg-theme-bg-section/50 disabled:border-theme-main-color/30 active:scale-95',
  danger:
    'border-[#FF5A5F] hover:bg-[#FF5A5F]/10 dark:hover:bg-[#FF5A5F]/20 hover:border-[#FF7B81] focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] disabled:bg-[#FFEBEE] dark:disabled:bg-theme-bg-section/50 disabled:border-[#FFB3B8] active:scale-95',
};

const CONTAINER = (props: Props) => {
  const { text, color = 'default', className = '', ...rest } = props;

  return (
    <button
      className={`
        px-6 py-3 rounded-lg
        border-none
        transition-all duration-200 ease-in-out
        shadow-md hover:shadow-lg
        disabled:shadow-none disabled:cursor-not-allowed
        ${containerStyles[color]} 
        ${className}
      `}
      {...rest}>
      <strong className="text-white disabled:text-theme-txt-gray whitespace-nowrap font-semibold">{text}</strong>
    </button>
  );
};

const OUTLINE = (props: Props) => {
  const { text, color = 'default', className = '', ...rest } = props;

  return (
    <button
      className={`
        px-6 py-3 rounded-xl
        border
        bg-theme-bg-card/30 dark:bg-theme-bg-section/30 backdrop-blur-md
        transition-all duration-200 ease-in-out
        focus:outline-none
        shadow-lg shadow-black/5 dark:shadow-black/20
        hover:shadow-xl
        disabled:cursor-not-allowed disabled:opacity-60
        ${outlineStyles[color]} 
        ${className}
      `}
      {...rest}>
      <strong
        className={`whitespace-nowrap font-semibold ${color === 'default' ? 'text-theme-main-color disabled:text-theme-txt-gray' : 'text-[#FF5A5F]'}`}>
        {text}
      </strong>
    </button>
  );
};

export const Button = {
  CONTAINER,
  OUTLINE,
};
