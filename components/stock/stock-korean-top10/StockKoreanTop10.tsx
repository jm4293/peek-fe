'use client';

import { DayjsUtil } from '@/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { LineSkeleton } from '@/components/skeleton';
import { NetworkErrorText, Text } from '@/components/text';
import { EmptyDataView, Wrapper } from '@/components/wrapper';

import { useStockKoreanTop10 } from '@/hooks/socket';

import { KoreanStockTop10 } from '@/shared/types';

export const StockKoreanTop10 = () => {
  const { data, isConnected, loading } = useStockKoreanTop10();

  const StockKoreanTop10Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Wrapper.SECTION>
        <Link className="flex justify-between items-center" href="/stock/korean/top10">
          <div className="flex items-center gap-2">
            <Text.HEADING text="국내 시가총액" />
            {isConnected && data && (
              <Text.CAPTION text={DayjsUtil.of(data.createdAt).formatMMDDHHmmss()} className="text-nowrap" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <Text.CAPTION text="10초마다 갱신됩니다." color="gray" className="text-end" />
            <ChevronRight />
          </div>
        </Link>
        {children}
      </Wrapper.SECTION>
    );
  };

  const Render = (props: { data: KoreanStockTop10[] }) => {
    const { data } = props;

    return (
      <div className="w-full flex flex-col gap-4 max-h-80 overflow-hidden overflow-y-scroll">
        {data.map((item, index) => (
          <div key={item.hname} className="flex items-center gap-4">
            <Text.PARAGRAPH text={`${index + 1}.`} />
            <div>
              <Text.HEADING text={item.hname} />
              <div className="flex items-center gap-2">
                <Text.PARAGRAPH text={`현재가: ${item.price.toLocaleString()}`} />
                <Text.PARAGRAPH text={`변동: ${item.change} (${item.diff}%)`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <StockKoreanTop10Wrapper>
        <LineSkeleton />
      </StockKoreanTop10Wrapper>
    );
  }

  if (!isConnected) {
    return (
      <StockKoreanTop10Wrapper>
        <NetworkErrorText />
      </StockKoreanTop10Wrapper>
    );
  }

  return (
    <StockKoreanTop10Wrapper>
      <div className="flex justify-center items-center gap-12">
        {data ? <Render data={data.list} /> : <EmptyDataView text="국내 시가총액 데이터" />}
      </div>
    </StockKoreanTop10Wrapper>
  );
};
