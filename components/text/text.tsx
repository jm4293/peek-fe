'use client';

interface IProps {
  value: string;
  color?: 'black' | 'gray' | 'red';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'bold';
  onClick?: () => void;
  className?: string;
  nowrap?: boolean;
  ellipsis?: boolean;
}

const textColor = {
  black: 'text-black',
  gray: 'text-[#666666]',
  red: 'text-[#F87171]',
};

const fontSize = {
  xs: 'text-xs', // 12px
  sm: 'text-sm', // 14px
  base: 'text-base', // 16px
  lg: 'text-lg', // 18px
  xl: 'text-xl', // 20px
  '2xl': 'text-2xl', // 24px
  '3xl': 'text-3xl', // 30px
  '4xl': 'text-4xl', // 36px
  '5xl': 'text-5xl', // 48px
};

const textAlign = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const fontWeight = {
  normal: 'font-normal',
  bold: 'font-bold',
};

export default function Text(props: IProps) {
  const {
    value,
    color = 'black',
    size = 'base',
    align = 'left',
    weight = 'normal',
    onClick,
    className,
    nowrap,
    ellipsis,
  } = props;

  const clickHandler = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <p
      className={`${textColor[color]} ${fontSize[size]} ${textAlign[align]} ${fontWeight[weight]} ${onClick && 'cursor-pointer'} ${nowrap && 'whitespace-nowrap'} ${ellipsis && 'overflow-hidden text-ellipsis'} ${className}`}
      onClick={(event) => clickHandler(event)}
      style={{ wordBreak: 'break-word' }}
    >
      {value}
    </p>
  );
}
