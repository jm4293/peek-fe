import { Text } from '../text';
import { Wrapper } from './Wrapper';

export const InternalErrorView = () => {
  return (
    <Wrapper.SECTION>
      <Text.PARAGRAPH text="서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." color="red" />
    </Wrapper.SECTION>
  );
};
