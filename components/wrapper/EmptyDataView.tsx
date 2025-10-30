import { Text } from '../text';
import { Wrapper } from './Wrapper';

interface IProps {
  text: string;
}

export const EmptyDataView = (props: IProps) => {
  const { text } = props;

  return (
    <Wrapper.SECTION>
      <Text.CAPTION text={`${text}이(가) 없습니다.`} />
    </Wrapper.SECTION>
  );
};
