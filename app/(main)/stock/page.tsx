import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

export default function Page() {
  return (
    <Wrapper.MAIN text="Stock">
      <Wrapper.SECTION>
        <Text.PARAGRAPH text="Stock Page" />
      </Wrapper.SECTION>
    </Wrapper.MAIN>
  );
}
