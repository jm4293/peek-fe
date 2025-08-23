'use client';

import { ButtonHTMLAttributes } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color?: 'default' | 'danger';
}

const CONTAINER = (props: IProps) => {
  const { text, color = 'default', className, ...rest } = props;

  return (
    <button className={`border-none bg-[#5A4FCF] hover:bg-[#786DE8] disabled:bg-[#A7A3D3] ${className}`} {...rest}>
      <strong className={`text-white disabled:text-[#A7A3D3] whitespace-nowrap disabled:cursor-not-allowed`}>
        {text}
      </strong>
    </button>
  );
};

const OUTLINE = (props: IProps) => {
  const { text, color = 'default', className, ...rest } = props;

  return (
    <button
      className={`border border-solid border-[#5A4FCF] bg-white hover:bg-[#F0F0FF] disabled:bg-[#F0F0FF] ${className}`}
      {...rest}>
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
