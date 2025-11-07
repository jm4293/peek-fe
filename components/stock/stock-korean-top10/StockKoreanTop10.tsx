'use client';

import { DayjsUtil } from '@/utils';

import { LineSkeleton } from '@/components/skeleton';
import { NetworkErrorText, Text } from '@/components/text';
import { EmptyDataView, Wrapper } from '@/components/wrapper';

import { useStockKoreanTop10 } from '@/hooks/socket';

import { IKoreanStockTop10 } from '@/shared/types';

export const StockKoreanTop10 = () => {
  const { data, isConnected, loading } = useStockKoreanTop10();

  const StockKoreanTop10Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Wrapper.SECTION>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Text.HEADING text="국내 시가총액" />
            {isConnected && data && (
              <Text.CAPTION text={DayjsUtil.of(data.createdAt).formatMMDDHHmmss()} className="text-nowrap" />
            )}
          </div>
          <Text.CAPTION text="10초마다 갱신됩니다." color="gray" className="text-end" />
        </div>
        {children}
      </Wrapper.SECTION>
    );
  };

  const Render = (props: { data: IKoreanStockTop10[] }) => {
    const { data } = props;

    return (
      <div className="w-full max-h-80 overflow-hidden overflow-y-scroll">
        {data.map((item) => (
          <div key={item.hname} className="mb-4">
            <Text.HEADING text={item.hname} />
            <div className="flex items-center gap-2">
              <Text.PARAGRAPH text={`현재가: ${item.price.toLocaleString()}`} />
              <Text.PARAGRAPH text={`변동: ${item.change} (${item.diff}%)`} />
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
