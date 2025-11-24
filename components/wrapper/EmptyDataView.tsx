import { Text } from '../text';
import { Wrapper } from './Wrapper';

interface Props {
  text: string;
  className?: string;
}

export const EmptyDataView = (props: Props) => {
  const { text, className } = props;

  return (
    <Wrapper.SECTION>
      <Text.PARAGRAPH text={`${text}이(가) 없습니다.`} className={`text-center ${className}`} />
    </Wrapper.SECTION>
  );
};
