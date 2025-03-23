'use client';

interface IClientTextProps {
  value: string;
  color: '#000000' | '#282828' | '#444444' | '#666666' | '#F87171';
  size?: 'sm' | 'base' | 'lg' | 'xl';
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'bold';
  onClick?: () => void;
  className?: string;
}

const textColor = {
  '#000000': 'text-black',
  '#282828': 'text-[#282828]',
  '#444444': 'text-[#444444]',
  '#666666': 'text-[#666666]',
  '#F87171': 'text-[#f87171]',
};

const fontSize = {
  sm: 'text-sm', // 14px
  base: 'text-base', // 16px
  lg: 'text-lg', // 18px
  xl: 'text-xl', // 20px
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

export default function Text(props: IClientTextProps) {
  const { value, color, size = 'base', align = 'left', weight = 'normal', onClick, className } = props;

  const clickHandler = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    event.stopPropagation();

    if (onClick) {
      onClick();
    }
  };

  return (
    <p
      className={`${textColor[color]} ${fontSize[size]} ${textAlign[align]} ${fontWeight[weight]} ${onClick && 'cursor-pointer'} ${className}`}
      onClick={(event) => clickHandler(event)}
      style={{ wordBreak: 'break-word' }}>
      {value}
    </p>
  );
}
