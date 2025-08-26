'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';

export default function StockSearch() {
  const router = useRouter();

  const [searchText, setSearchText] = useState('');
  const { debouncedText, isPending } = useDebounce({ text: searchText, delay: 400 });

  // const { data, isSuccess, isLoading } = useStockListQuery({ text: debouncedText });

  const clickHandler = (params: { event: React.MouseEvent<HTMLDivElement, MouseEvent>; index: number }) => {
    const { event, index } = params;

    event.stopPropagation();

    // if (!data) {
    //   return;
    // }
    //
    // router.push(`/stock/detail/${data.stocks[index].code}`);
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

  return <></>;
}
