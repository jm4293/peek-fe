'use client';

import { LocalStorageUtil, StockSignMarkUtil } from '@/utils';
import { useRouter } from 'next/navigation';

import { InfinityList } from '@/components/infinity-list';
import { Text } from '@/components/text';
import { InternalErrorView, LoadingView } from '@/components/wrapper';

import { LocalStorageKey } from '@/shared/constant/local-storage-key';
import { StockRankEnum } from '@/shared/enum/stock';

export default function PopularStock() {
  const router = useRouter();

  // const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isSuccess, isLoading } = useStockKoreanRankList({
  //   type: StockRankEnum.MARKET_CAP_TOP,
  // });

  // const clickHandler = (item: IStockKoreanRankModel) => {
  //   const stored = LocalStorageUtil.getItem(LocalStorageKey.recentStock);
  //   const searches = stored ? JSON.parse(stored) : [];

  //   const filtered = searches.filter((el: StockKoreanCompanyModel) => el.code !== item.shcode);
  //   const updated = [{ code: item.shcode, companyName: item.hname, timestamp: Date.now() }, ...filtered].slice(0, 10);

  //   LocalStorageUtil.setItem(LocalStorageKey.recentStock, JSON.stringify(updated));

  //   router.push(`/stock/detail/${item.shcode}`);
  // };

  // if (isLoading) {
  //   return <LoadingView />;
  // }

  // if (!isSuccess) {
  //   return <InternalErrorView />;
  // }

  // const renderItem = (item: IStockKoreanRankModel, index: number) => {
  //   const { shcode, hname, price, sign, change, diff, volume, total } = item;

  //   return (
  //     <li key={shcode} onClick={() => clickHandler(item)}>
  //       <div className="flex items-center gap-2">
  //         <div>
  //           <Text.HEADING text={`${index + 1}.`} />
  //         </div>

  //         <div className="w-full flex justify-between items-center">
  //           <div className="flex flex-col">
  //             <Text.HEADING text={hname} className="whitespace-nowrap" />
  //             <Text.CAPTION text={shcode} color="gray" />
  //           </div>
  //           <div className="flex flex-col">
  //             <KoreanStockIndexText price={String(price.toLocaleString())} sign={sign} size="HEADING" className="text-end" />
  //             <KoreanStockIndexText
  //               price={`${StockSignMarkUtil(sign)}${String(change.toLocaleString())}(${diff}%)`}
  //               sign={sign}
  //               size="PARAGRAPH"
  //               className="text-end"
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     </li>
  //   );
  // };

  // return (
  //   <>
  //     <Text.HEADING text="시가총액 상위 리스트" />

  //     {data.stockKoreanRankList.length > 0 ? (
  //       <InfinityList hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage}>
  //         {data.stockKoreanRankList.map(renderItem)}
  //       </InfinityList>
  //     ) : (
  //       <Text.HEADING text="종목이 없습니다." className="text-center" />
  //     )}
  //   </>
  // );
}
