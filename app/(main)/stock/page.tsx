import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { CodeKoreanList } from './CodeKoreanList';

export default function Page() {
  return (
    <Wrapper.MAIN text="주식">
      <Wrapper.SECTION>
        <Text.PARAGRAPH text="Stock Page" />

        <CodeKoreanList />
      </Wrapper.SECTION>
    </Wrapper.MAIN>
  );
}
