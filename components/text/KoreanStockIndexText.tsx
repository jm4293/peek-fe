import { AnimatedText } from '@/components/text';

interface IProps {
  price: string;
  sign: string;
  size: 'HEADING' | 'PARAGRAPH';
  className?: string;
}

export const KoreanStockIndexText = (props: IProps) => {
  const { price, sign, size, className } = props;

  if (size === 'HEADING') {
    return (
      <AnimatedText.TITLE
        text={price}
        color={`${sign === '2' ? 'red' : sign === '5' ? 'blue' : 'default'}`}
        className={`text-nowrap ${className}`}
      />
    );
  }

  return (
    <AnimatedText.PARAGRAPH
      text={price}
      color={`${sign === '2' ? 'red' : sign === '5' ? 'blue' : 'default'}`}
      className={`text-nowrap ${className}`}
    />
  );
};
