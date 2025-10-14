import { Currency, StockKoreanIndex } from '@/components/stock';
import { CurrentTimeText } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

export default async function HomePage() {
  return (
    <Wrapper.MAIN text="메인">
      <CurrentTimeText />

      <StockKoreanIndex />
      <Currency />
    </Wrapper.MAIN>
  );
}
