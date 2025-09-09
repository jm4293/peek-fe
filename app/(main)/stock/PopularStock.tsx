'use client';

import { InfinityList } from '@/components/infinity-list';
import { LineSkeleton } from '@/components/skeleton';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { IStockKoreanRankModel, useStockKoreanRankList } from '@/services/stock';

import { StockRankEnum } from '@/shared/enum/stock';

import { useStockProvider } from './StockCodeProvider';

const signMark = (sign: string) => {
  if (sign === '2') {
    return '+';
  }
  if (sign === '5') {
    return '-';
  }

  return '';
};

const signColor = (sign: string) => {
  if (sign === '2') {
    return 'red';
  }
  if (sign === '5') {
    return 'blue';
  }
  return 'default';
};

export default function PopularStock() {
  // const { stock } = useStockProvider();

  // return <div>Popular Stock: {stock?.companyName || '선택된 종목이 없습니다.'}</div>;

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isSuccess, isLoading, isFetching } =
    useStockKoreanRankList({
      type: StockRankEnum.MARKET_CAP_TOP,
    });

  if (isLoading) {
    return <LineSkeleton />;
  }

  if (!isSuccess) {
    return <Text.PARAGRAPH text="네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요." color="red" />;
  }

  const renderItem = (item: IStockKoreanRankModel, index: number) => {
    const { shcode, hname, price, sign, change, diff, volume, total } = item;

    return (
      <li key={shcode}>
        <div className="flex items-center gap-2">
          <div>
            <Text.HEADING text={`${index + 1}.`} />
          </div>

          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col">
              <Text.HEADING text={hname} className="whitespace-nowrap" />
              <Text.CAPTION text={String(shcode)} color="gray" />
            </div>
            <div className="flex flex-col">
              <Text.HEADING text={String(price.toLocaleString())} color={signColor(sign)} nowrap className="text-end" />
              <Text.PARAGRAPH
                text={`${signMark(sign)}${change.toLocaleString()}(${diff}%)`}
                color={signColor(sign)}
                nowrap
              />

              {/* <div className="flex justify-end items-center gap-2">
                <div className="flex flex-col items-end">
                  <Text.PARAGRAPH text="거래량" />
                  <Text.CAPTION text={String(volume.toLocaleString())} color="gray" />
                </div>
                <div className="flex flex-col items-end">
                  <Text.PARAGRAPH text="시가총액" />
                  <Text.CAPTION text={`${String(total.toLocaleString())}`} color="gray" />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </li>
    );
  };

  return (
    <>
      <Text.HEADING text="시가총액 상위 리스트" />

      {data.stockKoreanRankList.length > 0 ? (
        <InfinityList
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          maxHeight={40}>
          {data.stockKoreanRankList.map(renderItem)}
        </InfinityList>
      ) : (
        <Text.HEADING text="종목이 없습니다." className="text-center" />
      )}
    </>
  );
}
