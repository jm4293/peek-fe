interface Props {
  text: string;
  color?: 'default' | 'gray' | 'blue' | 'red';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'bold';
  className?: string;
}

const textColor = {
  default: 'text-theme-txt-default',
  gray: 'text-theme-txt-gray',
  blue: 'text-theme-txt-blue',
  red: 'text-theme-txt-red',
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

export function PreText(props: Props) {
  const { text, color = 'default', size = 'base', align = 'left', weight = 'normal', className } = props;

  return (
    <pre
      className={`whitespace-pre-line ${textColor[color]} ${fontSize[size]} ${textAlign[align]} ${fontWeight[weight]} ${className}`}>
      {text}
    </pre>
  );
}
