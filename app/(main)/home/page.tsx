import { CurrentTimeText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

export default async function HomePage() {
  return (
    <Wrapper.MAIN
      text={
        <div className="flex items-center justify-between">
          <Text.TITLE text="메인" />
          <CurrentTimeText />
        </div>
      }
    />
  );
}
