'use client';

import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | React.ReactNode;
  color?: 'default' | 'danger';
}

const containerStyles = {
  default: 'bg-[#5A4FCF] hover:bg-[#786DE8] disabled:bg-[#A7A3D3] active:scale-95',
  danger: 'bg-[#FF5A5F] hover:bg-[#FF7B81] disabled:bg-[#FFB3B8] active:scale-95',
};

const outlineStyles = {
  default: 'border-[#5A4FCF] text-[#5A4FCF] hover:bg-[#F0F0FF] disabled:bg-[#F0F0FF] active:scale-95',
  danger: 'border-[#FF5A5F] text-[#FF5A5F] hover:bg-[#FFEBEE] disabled:bg-[#FFEBEE] active:scale-95',
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
      <strong className="text-white disabled:text-[#E0E0E0] whitespace-nowrap font-semibold">{text}</strong>
    </button>
  );
};

const OUTLINE = (props: Props) => {
  const { text, color = 'default', className = '', ...rest } = props;

  return (
    <button
      className={`
        px-6 py-3 rounded-lg
        bg-gray-100
        transition-all duration-200 ease-in-out
        hover:shadow-md
        disabled:cursor-not-allowed disabled:opacity-60
        ${outlineStyles[color]} 
        ${className}
      `}
      {...rest}>
      <strong className="disabled:text-[#A7A3D3] whitespace-nowrap font-semibold">{text}</strong>
    </button>
  );
};

export const Button = {
  CONTAINER,
  OUTLINE,
};
