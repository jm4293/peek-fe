import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

export default function Chart() {
  return (
    <Wrapper title="지수">
      <Text.PARAGRAPH text="코스피" />
      {/* <Text.PARAGRAPH text="코스닥" /> */}
    </Wrapper>
  );
}
