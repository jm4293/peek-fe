'use client';

import { useStockListQuery } from '@/hooks';
import Text from '@/components/text/text';
import { useState } from 'react';
import LineSkeleton from '@/components/skeleton/lineSkeleton';
import VirtualTable from '@/components/table/virtualTable';
import Datalist from '@/components/select/datalist';
import Wrapper from '@/components/wrapper/wrapper';

export default function StockSearch() {
  const [searchText, setSearchText] = useState('');

  const { data, isSuccess } = useStockListQuery({});

  const renderRow = (index: number) => {
    if (!isSuccess) {
      return null;
    }

    const { stocks } = data;

    return (
      <div className="flex justify-between items-center">
        <Text value={String(stocks[index].companyName)} />
        <Text value={String(stocks[index].code)} />
      </div>
    );
  };

  console.log('searchText', searchText);

  return (
    <div className="flex flex-col gap-4">
      <Datalist
        name="주식종목"
        optionList={data?.stocks.map((el) => el.companyName)}
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />

      <Wrapper>
        {isSuccess ? (
          data?.total > 0 ? (
            <VirtualTable total={data.total} renderRow={renderRow} />
          ) : (
            <Text value="검색 결과가 없습니다." />
          )
        ) : (
          <div className="flex flex-col gap-2">
            <LineSkeleton height={2} />
            <LineSkeleton height={2} />
            <LineSkeleton height={2} />
            <LineSkeleton height={2} />
          </div>
        )}
      </Wrapper>
    </div>
  );
}
