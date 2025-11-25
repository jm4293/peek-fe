'use client';

import { DayjsUtil } from '@/utils';
import Link from 'next/link';

import { LineSkeleton } from '@/components/skeleton';
import { KoreanStockIndexText, NetworkErrorText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useStockKoreanTop10 } from '@/hooks/socket';

import { KoreanStockTop10 } from '@/shared/types/stock';

export const StockKoreanTop10 = () => {
  const { data, isConnected, loading } = useStockKoreanTop10();

  const StockKoreanTop10Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Wrapper.SECTION>
        <Link className="flex justify-between items-center" href="/stock/korean/top10">
          <div className="flex items-center gap-2">
            <Text.HEADING text="한국 시가총액" />
            {isConnected && data && (
              <Text.CAPTION text={DayjsUtil.of(data.createdAt).formatMMDDHHmmss()} className="text-nowrap" />
            )}
          </div>
          {isConnected && data && <Text.CAPTION text="10초마다 갱신됩니다." color="gray" className="text-end" />}
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
            <div className="w-full flex justify-between items-center">
              <Text.HEADING text={item.hname} />
              <div className="flex flex-col items-end">
                <KoreanStockIndexText
                  price={(+item.price).toLocaleString()}
                  sign={item.sign}
                  size="PARAGRAPH"
                  className="text-end"
                />
                <KoreanStockIndexText
                  price={`${item.change} (${item.diff}%)`}
                  sign={item.sign}
                  size="PARAGRAPH"
                  className="text-end"
                />
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

  if (!data?.list.length) {
    return (
      <StockKoreanTop10Wrapper>
        <Text.PARAGRAPH text="시가총액 데이터가 없습니다." className="text-center" />
      </StockKoreanTop10Wrapper>
    );
  }

  return (
    <StockKoreanTop10Wrapper>
      <Render data={data?.list || []} />
    </StockKoreanTop10Wrapper>
  );
};
