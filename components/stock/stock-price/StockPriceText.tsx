import { Text } from '@/components/text';

interface IProps {
  price: string;
  sign: string;
  size: 'HEADING' | 'PARAGRAPH';
  className?: string;
}

export const StockPriceText = (props: IProps) => {
  const { price, sign, size, className } = props;

  if (size === 'HEADING') {
    return (
      <Text.TITLE
        text={price}
        color={`${sign === '2' ? 'red' : sign === '5' ? 'blue' : 'default'}`}
        className={`text-nowrap ${className}`}
      />
    );
  }

  return (
    <Text.PARAGRAPH
      text={price}
      color={`${sign === '2' ? 'red' : sign === '5' ? 'blue' : 'default'}`}
      className={`text-nowrap ${className}`}
    />
  );
};
