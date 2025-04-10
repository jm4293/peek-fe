'use client';

import { useStockListQuery } from '@/hooks';
import Text from '@/components/text/text';
import { useState } from 'react';
import LineSkeleton from '@/components/skeleton/lineSkeleton';

export default function StockSearch() {
  const [searchText, setSearchText] = useState('');

  const { data, isSuccess } = useStockListQuery({});

  return (
    <>
      <div></div>
      <div>
        {isSuccess ? (
          data.total > 0 ? (
            <div className="flex flex-col gap-4">
              {data.stocks.map((stock) => {
                return (
                  <div key={stock.code} className="flex justify-between">
                    <Text value={stock.companyName} />
                    <Text value={String(stock.code)} color="gray" />
                  </div>
                );
              })}
            </div>
          ) : (
            <Text value="검색 결과가 없습니다." />
          )
        ) : (
          <LineSkeleton height={2} />
        )}
      </div>
    </>
  );
}
