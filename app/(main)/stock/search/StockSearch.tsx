'use client';

import { LocalStorageUtil } from '@/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { InfinityList } from '@/components/infinity-list';
import { Input } from '@/components/input';
import { LineSkeleton } from '@/components/skeleton';
import { NetworkErrorText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useDebounce } from '@/hooks/useDebounce';

import { StockKoreanCompanyModel, useStockKoreanList } from '@/services/stock';

import { LocalStorageKey } from '@/shared/constant/local-storage-key';

import { useStockProvider } from '../StockCodeProvider';

export default function StockSearch() {
  const router = useRouter();

  const { setStock } = useStockProvider();

  const [searchText, setSearchText] = useState('');
  const { debouncedText, isPending: isPendingDebounce } = useDebounce({ text: searchText, delay: 400 });

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isSuccess, isLoading } = useStockKoreanList({
    text: debouncedText || '',
  });

  const clickHandler = (item: StockKoreanCompanyModel) => {
    const stored = LocalStorageUtil.getItem(LocalStorageKey.recentStock);
    const searches = stored ? JSON.parse(stored) : [];

    const filtered = searches.filter((el: StockKoreanCompanyModel) => el.code !== item.code);
    const updated = [{ ...item, timestamp: Date.now() }, ...filtered].slice(0, 10);

    LocalStorageUtil.setItem(LocalStorageKey.recentStock, JSON.stringify(updated));

    setStock(item);
    router.push(`/stock/detail/${item.code}`);
  };

  const renderItem = (item: StockKoreanCompanyModel) => {
    const { id, companyName, code, products, industry } = item;

    return (
      <li key={id}>
        <div className="flex flex-col gap-1" onClick={() => clickHandler(item)}>
          <div className="flex justify-between items-center gap-4">
            <div className="flex flex-col">
              <Text.HEADING text={companyName} className="whitespace-nowrap" />
              <Text.CAPTION text={code} color="gray" />
            </div>
            <div className="w-32 flex flex-col">
              <Text.PARAGRAPH
                text={industry}
                className="text-end w-full overflow-hidden whitespace-nowrap text-ellipsis"
              />
              <Text.CAPTION
                text={products}
                color="gray"
                className="text-end w-full overflow-hidden whitespace-nowrap text-ellipsis"
              />
            </div>
          </div>
        </div>
      </li>
    );
  };

  const isSearchLoading = isPendingDebounce || isLoading;

  const hasError = !isSuccess && !isSearchLoading;

  return (
    <div className="flex flex-col gap-4">
      <Wrapper.SECTION>
        <Input
          label="종목 검색"
          name="title"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="종목명을 입력해주세요"
          required
        />
      </Wrapper.SECTION>

      <Wrapper.SECTION>
        <div className="flex flex-col gap-2">
          <Text.CAPTION text={`총: ${data?.total || 0}건`} className="text-end" />
          <hr />
        </div>

        <div className="max-h-[70vh] overflow-y-auto">
          {isSearchLoading ? (
            <div className="flex flex-col gap-2">
              <LineSkeleton />
              <LineSkeleton />
            </div>
          ) : hasError ? (
            <NetworkErrorText />
          ) : data && data.stockKoreanList.length > 0 ? (
            <InfinityList
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}>
              {data.stockKoreanList.map(renderItem)}
            </InfinityList>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Text.HEADING text="검색된 종목이 없습니다." className="text-gray-500" />
            </div>
          )}
        </div>
      </Wrapper.SECTION>
    </div>
  );
}
