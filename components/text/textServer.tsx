'use server';

interface IClientTextProps {
  value: string;
  color: '#000000' | '#282828' | '#444444' | '#666666';
  size?: 'sm' | 'base' | 'lg' | 'xl';
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'bold';
  className?: string;
}

const textColor = {
  '#000000': 'text-black',
  '#282828': 'text-[#282828]',
  '#444444': 'text-[#444444]',
  '#666666': 'text-[#666666]',
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

export default async function TextServer(props: IClientTextProps) {
  const { value, color, size = 'base', align = 'left', weight = 'normal', className } = props;

  return (
    <p
      className={`${textColor[color]} ${fontSize[size]} ${textAlign[align]} ${fontWeight[weight]} ${className}`}
      style={{ wordBreak: 'break-word' }}>
      {value}
    </p>
  );
}
