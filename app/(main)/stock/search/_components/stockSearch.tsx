'use client';

import { useDebounce, useStockListQuery } from '@/hooks';
import Text from '@/components/text/text';
import { useState } from 'react';
import LineSkeleton from '@/components/skeleton/lineSkeleton';
import VirtualTable from '@/components/table/virtualTable';
import Wrapper from '@/components/wrapper/wrapper';
import Input from '@/components/input/input';
import { StockKindDescription } from '@/constant/enum';

export default function StockSearch() {
  const [searchText, setSearchText] = useState('');
  const { debouncedText, isPending } = useDebounce({ text: searchText, delay: 400 });

  const { data, isSuccess, isLoading } = useStockListQuery({ text: debouncedText });

  const renderRow = (index: number) => {
    if (!isSuccess) {
      return null;
    }

    const { stocks } = data;

    return (
      <div className="w-full flex justify-between items-center cursor-pointer">
        <div className="flex gap-4">
          <Text value={StockKindDescription[stocks[index].marketType]} />
          <Text value={String(stocks[index].companyName)} />
        </div>
        <Text value={String(stocks[index].code)} />
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Wrapper>
        <Input
          type="text"
          title="종목 검색"
          name="search"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </Wrapper>

      {isPending || isLoading ? (
        <div className="flex flex-col gap-2">
          <LineSkeleton height={2} />
          <LineSkeleton height={2} />
          <LineSkeleton height={2} />
          <LineSkeleton height={2} />
        </div>
      ) : (
        <Wrapper>
          {isSuccess &&
            (data?.total > 0 ? (
              <VirtualTable total={data.total} renderRow={renderRow} />
            ) : (
              <Text value="검색 결과가 없습니다." />
            ))}
        </Wrapper>
      )}
    </div>
  );
}
