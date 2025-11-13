'use client';

import { DayjsUtil } from '@/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { LineSkeleton } from '@/components/skeleton';
import { KoreanStockIndexText, NetworkErrorText, Text } from '@/components/text';
import { EmptyDataView, Wrapper } from '@/components/wrapper';

import { useStockKoreanIndex } from '@/hooks/socket';

interface StockIndexData {
  jisu: string;
  sign: string;
  change: string;
  drate: string;
  highjisu: string;
  lowjisu: string;
  time: string;
}

export const StockKoreanIndex = () => {
  const { kospi, kosdaq, loading, isConnected } = useStockKoreanIndex({ isKospi: true, isKosdaq: true });

  const StockKoreanIndexWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Wrapper.SECTION>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Text.HEADING text="국내 지수" />
            {isConnected && kospi && (
              <Text.CAPTION text={DayjsUtil.of(kospi.createdAt).formatMMDDHHmmss()} className="text-nowrap" />
            )}
          </div>
          {isConnected && kospi && (
            <div className="flex items-center gap-2">
              <Text.CAPTION text="10초마다 갱신됩니다." color="gray" className="text-end" />
              <ChevronRight />
            </div>
          )}
        </div>
        {children}
      </Wrapper.SECTION>
    );
  };

  const Render = (props: { indexData: StockIndexData; title: string; href: string }) => {
    const { indexData, title, href } = props;

    return (
      <Link href={href} className="flex flex-col justify-center items-center gap-2">
        <div className="flex flex-col items-center">
          <Text.HEADING text={title} />
          <KoreanStockIndexText
            price={(+indexData.jisu).toLocaleString()}
            sign={indexData.sign}
            size="HEADING"
            className="text-end"
          />
          <KoreanStockIndexText
            price={`${indexData.change}(${indexData.drate}%)`}
            sign={indexData.sign}
            size="PARAGRAPH"
            className="text-end"
          />
        </div>

        <div className="flex gap-4">
          <div className="">
            <Text.CAPTION text="최고" className="text-end" />
            <Text.CAPTION text={indexData.highjisu} />
          </div>

          <div className="">
            <Text.CAPTION text="최저" className="text-end" />
            <Text.CAPTION text={indexData.lowjisu} />
          </div>
        </div>
      </Link>
    );
  };

  if (loading) {
    return (
      <StockKoreanIndexWrapper>
        <LineSkeleton />
      </StockKoreanIndexWrapper>
    );
  }

  if (!isConnected) {
    return (
      <StockKoreanIndexWrapper>
        <NetworkErrorText />
      </StockKoreanIndexWrapper>
    );
  }

  return (
    <StockKoreanIndexWrapper>
      <div className="flex justify-center items-center gap-12">
        {kospi ? (
          <Render indexData={kospi} title="코스피" href="/index/kospi" />
        ) : (
          <EmptyDataView text="코스티 데이터" />
        )}
        {kosdaq ? (
          <Render indexData={kosdaq} title="코스닥" href="/index/kosdaq" />
        ) : (
          <EmptyDataView text="코스닥 데이터" />
        )}
      </div>
    </StockKoreanIndexWrapper>
  );
};
