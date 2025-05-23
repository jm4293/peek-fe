import Text from '@/components/text/text';
import Wrapper from '@/components/wrapper/wrapper';

export function Chart() {
  return (
    <Wrapper title="지수">
      <Text value="코스피" />
      <Text value="코스닥" />
    </Wrapper>
  );
}
