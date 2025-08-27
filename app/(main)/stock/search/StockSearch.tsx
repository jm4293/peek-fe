'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { InfinityList } from '@/components/infinity-list';
import { VirtualTable } from '@/components/table';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useDebounce } from '@/hooks/useDebounce';

import { IStockCompanyModel, useStockCodeKoreanList } from '@/services/stock';

import { useStockProvider } from '../StockCodeProvider';

export default function StockSearch() {
  const router = useRouter();

  const { setStock } = useStockProvider();

  const [list, setList] = useState<IStockCompanyModel[]>([]);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isSuccess } = useStockCodeKoreanList({});

  const [searchText, setSearchText] = useState('');
  const { debouncedText, isPending } = useDebounce({ text: searchText, delay: 400 });

  // const { data, isSuccess, isLoading } = useStockListQuery({ text: debouncedText });

  const clickHandler = (item: IStockCompanyModel) => {
    setStock(item);
    router.push('/stock');
  };

  const renderRow = (index: number) => {
    // if (!isSuccess) {
    //   return null;
    // }
    //
    // const { stocks } = data;
    //
    // return (
    //   <div
    //     className="w-full flex justify-between items-center cursor-pointer"
    //     onClick={(event) => clickHandler({ event, index })}>
    //     <div className="flex gap-4">
    //       <Text value={StockCategoryEnum[stocks[index].marketType]} />
    //       <Text value={String(stocks[index].companyName)} />
    //     </div>
    //     <Text value={String(stocks[index].code)} />
    //   </div>
    // );
  };

  // return (
  //   <div className="flex flex-col gap-4">
  //     <Wrapper>
  //       <Input
  //         type="text"
  //         title="종목 검색"
  //         name="search"
  //         value={searchText}
  //         onChange={(event) => setSearchText(event.target.value)}
  //       />
  //     </Wrapper>
  //
  //     {isPending || isLoading ? (
  //       <div className="flex flex-col gap-2">
  //         <LineSkeleton height={2} />
  //         <LineSkeleton height={2} />
  //         <LineSkeleton height={2} />
  //         <LineSkeleton height={2} />
  //       </div>
  //     ) : (
  //       <Wrapper>
  //         {isSuccess &&
  //           (data?.total > 0 ? (
  //             <VirtualTable total={data.total} renderRow={renderRow} />
  //           ) : (
  //             <Text value="검색 결과가 없습니다." />
  //           ))}
  //       </Wrapper>
  //     )}
  //   </div>
  // );

  useEffect(() => {
    if (isSuccess && data) {
      setList(data.stockCodeList);
    }
  }, [isSuccess, data]);

  const renderItem = (item: IStockCompanyModel) => {
    const { id, companyName } = item;

    return (
      <li key={id}>
        <Wrapper.SECTION>
          <div className="flex flex-col gap-1" onClick={() => clickHandler(item)}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Text.HEADING text={companyName} />
              </div>
            </div>
          </div>
        </Wrapper.SECTION>
      </li>
    );
  };

  if (list.length === 0) {
    return (
      <Wrapper.SECTION>
        <Text.HEADING text="검색된 종목이 없습니다." />
      </Wrapper.SECTION>
    );
  }

  return (
    <InfinityList hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage}>
      {list.map(renderItem)}
    </InfinityList>
  );
}
