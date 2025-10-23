'use client';

import { ButtonHTMLAttributes } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | React.ReactNode;
  color?: 'default' | 'danger';
}

const containerBorderColor = {
  default: 'bg-[#5A4FCF] hover:bg-[#786DE8] disabled:bg-[#A7A3D3]',
  danger: 'bg-[#FF5A5F] hover:bg-[#FF7B81] disabled:bg-[#FFB3B8]',
};

const outlineBorderColor = {
  default: 'border-[#5A4FCF] hover:bg-[#F0F0FF] disabled:bg-[#F0F0FF]',
  danger: 'border-[#FF5A5F] hover:bg-[#FFEBEE] disabled:bg-[#FFEBEE]',
};

const CONTAINER = (props: IProps) => {
  const { text, color = 'default', className, ...rest } = props;

  return (
    <button className={`border-none ${containerBorderColor[color]} ${className}`} {...rest}>
      <strong className={`text-white disabled:text-[#A7A3D3] whitespace-nowrap disabled:cursor-not-allowed`}>
        {text}
      </strong>
    </button>
  );
};

const OUTLINE = (props: IProps) => {
  const { text, color = 'default', className, ...rest } = props;

  return (
    <button className={`border border-solid ${outlineBorderColor[color]} ${className}`} {...rest}>
      <strong className={`text-[#5A4FCF] disabled:text-[#A7A3D3] whitespace-nowrap disabled:cursor-not-allowed`}>
        {text}
      </strong>
    </button>
  );
};

export const Button = {
  CONTAINER,
  OUTLINE,
};
