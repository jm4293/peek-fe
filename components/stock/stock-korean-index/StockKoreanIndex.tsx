'use client';

import Link from 'next/link';
import Marquee from 'react-fast-marquee';

import { LineSkeleton } from '@/components/skeleton';
import { NetworkErrorText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useKoreanStockIndex } from '@/hooks/stock-index';

import { StockPriceText } from '../stock-price';

const TITLE = () => {
  return (
    <div className="flex justify-between items-center">
      <Text.HEADING text="국내 지수" />
      <Text.CAPTION text="10초마다 갱신됩니다." color="gray" className="text-end" />
    </div>
  );
};

export const StockKoreanIndex = () => {
  const { kospi, kosdaq, loading, isConnected } = useKoreanStockIndex({ isKospi: true, isKosdaq: true });

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

      <Marquee speed={20} pauseOnHover={true} gradient={false} gradientWidth={40}>
        <div className="mx-12">
          {kospi ? (
            <Link href="/index/kospi">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Text.HEADING text="코스피" nowrap className="text-end" />
                  <StockPriceText
                    price={(+kospi.jisu).toLocaleString()}
                    sign={kospi.sign}
                    size="HEADING"
                    className="text-end"
                  />
                  <StockPriceText
                    price={`${kospi.change}(${kospi.drate}%)`}
                    sign={kospi.sign}
                    size="PARAGRAPH"
                    className="text-end"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Text.PARAGRAPH text={`최고 ${kospi.highjisu}`} color="gray" nowrap />
                  <Text.PARAGRAPH text={`최저 ${kospi.lowjisu}`} color="gray" nowrap />
                  <Text.CAPTION
                    text={kospi.time.slice(0, 2) + ':' + kospi.time.slice(2, 4) + ':' + kospi.time.slice(4, 6)}
                    color="gray"
                    nowrap
                  />
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Text.HEADING text="코스피" nowrap />
              <Text.PARAGRAPH text="데이터가 없습니다." color="gray" nowrap />
            </div>
          )}
        </div>
        <div>
          {kosdaq ? (
            <Link href="/index/kosdaq">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Text.HEADING text="코스닥" nowrap className="text-end" />
                  <StockPriceText
                    price={(+kosdaq.jisu).toLocaleString()}
                    sign={kosdaq.sign}
                    size="HEADING"
                    className="text-end"
                  />
                  <StockPriceText
                    price={`${kosdaq.change}(${kosdaq.drate}%)`}
                    sign={kosdaq.sign}
                    size="PARAGRAPH"
                    className="text-end"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Text.PARAGRAPH text={`최고 ${kosdaq.highjisu}`} color="gray" nowrap />
                  <Text.PARAGRAPH text={`최저 ${kosdaq.lowjisu}`} color="gray" nowrap />
                  <Text.CAPTION
                    text={kosdaq.time.slice(0, 2) + ':' + kosdaq.time.slice(2, 4) + ':' + kosdaq.time.slice(4, 6)}
                    color="gray"
                    nowrap
                  />
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Text.HEADING text="코스닥" nowrap />
              <Text.PARAGRAPH text="데이터가 없습니다." color="gray" nowrap />
            </div>
          )}
        </div>
      </Marquee>
    </Wrapper.SECTION>
  );
};
