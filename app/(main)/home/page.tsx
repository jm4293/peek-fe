import { Currency } from '@/components/stock/currency';
import { StockKoreanIndex } from '@/components/stock/stock-korean-index';
import { Wrapper } from '@/components/wrapper';

export default async function HomePage() {
  return (
    <Wrapper.MAIN text="메인">
      <StockKoreanIndex />
      <Currency />
    </Wrapper.MAIN>
  );
}
