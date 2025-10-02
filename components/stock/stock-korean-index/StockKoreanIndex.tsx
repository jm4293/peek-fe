'use client';

import Link from 'next/link';

import { LineSkeleton } from '@/components/skeleton';
import { NetworkErrorText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useKoreanStockIndex } from '@/hooks/stock-index';

import { StockPriceText } from '../stock-price';

export const StockKoreanIndex = () => {
  const { kospi, kosdaq, loading, isConnected } = useKoreanStockIndex({ isKospi: true, isKosdaq: true });

  const TITLE = () => {
    return (
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Text.HEADING text="국내 지수" />
          {isConnected && kospi && (
            <Text.CAPTION
              text={kospi.time.slice(0, 2) + ':' + kospi.time.slice(2, 4) + ':' + kospi.time.slice(4, 6)}
              color="gray"
              className="text-nowrap"
            />
          )}
        </div>

        <Text.CAPTION text="10초마다 갱신됩니다." color="gray" className="text-end" />
      </div>
    );
  };

  if (loading) {
    return (
      <Wrapper.SECTION>
        <TITLE />

        <LineSkeleton />
      </Wrapper.SECTION>
    );
  }

  if (!isConnected) {
    return (
      <Wrapper.SECTION>
        <TITLE />

        <NetworkErrorText />
      </Wrapper.SECTION>
    );
  }

  return (
    <Wrapper.SECTION>
      <TITLE />

      {kospi && (
        <Link href="/index/kospi">
          <Text.HEADING text="코스피" />
          <div className="flex items-center gap-4">
            <div className="min-w-20 flex flex-col items-end">
              <Text.PARAGRAPH text="지수" className="text-end" />
              <StockPriceText
                price={(+kospi.jisu).toLocaleString()}
                sign={kospi.sign}
                size="HEADING"
                className="text-end"
              />
            </div>

            <div className="min-w-24 flex flex-col items-end">
              <Text.PARAGRAPH text="변동" className="text-end" />
              <StockPriceText
                price={`${kospi.change}(${kospi.drate}%)`}
                sign={kospi.sign}
                size="PARAGRAPH"
                className="text-end"
              />
            </div>

            <div className="min-w-20 flex flex-col items-end">
              <Text.PARAGRAPH text="최고" className="text-end" />
              <Text.HEADING text={`${kospi.highjisu}`} />
            </div>

            <div className="min-w-20 flex flex-col items-end">
              <Text.PARAGRAPH text="최저" className="text-end" />
              <Text.HEADING text={`${kospi.lowjisu}`} />
            </div>
          </div>
        </Link>
      )}

      {kosdaq && (
        <Link href="/index/kosdaq">
          <Text.HEADING text="코스닥" />
          <div className="flex items-center gap-4">
            <div className="min-w-20 flex flex-col items-end">
              <Text.PARAGRAPH text="지수" className="text-end" />
              <StockPriceText
                price={(+kosdaq.jisu).toLocaleString()}
                sign={kosdaq.sign}
                size="HEADING"
                className="text-end"
              />
            </div>

            <div className="min-w-24 flex flex-col items-end">
              <Text.PARAGRAPH text="변동" className="text-end" />
              <StockPriceText
                price={`${kosdaq.change}(${kosdaq.drate}%)`}
                sign={kosdaq.sign}
                size="PARAGRAPH"
                className="text-end"
              />
            </div>

            <div className="min-w-20 flex flex-col items-end">
              <Text.PARAGRAPH text="최고" className="text-end" />
              <Text.HEADING text={`${kosdaq.highjisu}`} />
            </div>

            <div className="min-w-20 flex flex-col items-end">
              <Text.PARAGRAPH text="최저" className="text-end" />
              <Text.HEADING text={`${kosdaq.lowjisu}`} />
            </div>
          </div>
        </Link>
      )}
    </Wrapper.SECTION>
  );
};
