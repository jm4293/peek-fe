'use client';

import { useStockListQuery } from '@/hooks';
import Text from '@/components/text/text';
import Skeleton from '@/components/skeleton/skeleton';
import { useState } from 'react';

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
                    <Text value={stock.companyName} color="#000000" />
                    <Text value={String(stock.code)} color="#666666" />
                  </div>
                );
              })}
            </div>
          ) : (
            <Text value="검색 결과가 없습니다." color="#000000" />
          )
        ) : (
          <Skeleton />
        )}
      </div>
    </>
  );
}
