import { Currency, StockKoreanIndex } from '@/components/stock';
import { StockKoreanTop10 } from '@/components/stock/stock-korean-top10';
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
      }>
      <div className="flex flex-wrap gap-2">
        <div className="flex-1 min-w-full md:min-w-[300px]">
          <StockKoreanIndex />
        </div>
        <div className="flex-1 min-w-full md:min-w-[300px]">
          <StockKoreanTop10 />
        </div>
      </div>
      <Currency />
    </Wrapper.MAIN>
  );
}
