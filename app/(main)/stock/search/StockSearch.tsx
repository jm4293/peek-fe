'use client';

import { LocalStorage } from '@/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { InfinityList } from '@/components/infinity-list';
import { Input } from '@/components/input';
import { LineSkeleton } from '@/components/skeleton';
import { VirtualTable } from '@/components/table';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useDebounce } from '@/hooks/useDebounce';

import { IStockCompanyModel, useStockCodeKoreanList } from '@/services/stock';

import { LocalStorageKey } from '@/shared/constant/local-storage-key';

import { useStockProvider } from '../StockCodeProvider';

export default function StockSearch() {
  const router = useRouter();

  const { setStock } = useStockProvider();

  const [searchText, setSearchText] = useState('');
  const { debouncedText, isPending } = useDebounce({ text: searchText, delay: 400 });

  // const { data, isSuccess, isLoading } = useStockListQuery({ text: debouncedText });

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isSuccess, isLoading } = useStockCodeKoreanList({
    text: debouncedText,
  });

  const clickHandler = (item: IStockCompanyModel) => {
    const stored = LocalStorage.getItem(LocalStorageKey.recentStock);
    const searches = stored ? JSON.parse(stored) : [];

    const filtered = searches.filter((el: IStockCompanyModel) => el.id !== item.id);
    const updated = [{ ...item, timestamp: Date.now() }, ...filtered].slice(0, 10);

    LocalStorage.setItem(LocalStorageKey.recentStock, JSON.stringify(updated));

    setStock(item);
    router.push(`/stock/detail/${item.code}`);
  };

  const renderItem = (item: IStockCompanyModel) => {
    const { id, companyName, code, products, industry } = item;

    return (
      <li key={id}>
        <Wrapper.SECTION>
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
        </Wrapper.SECTION>
      </li>
    );
  };

  if (!isSuccess) {
    return (
      <>
        <LineSkeleton h={2} />
        <LineSkeleton h={2} />
        <LineSkeleton h={2} />
      </>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        title="종목 검색"
        name="title"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="종목명을 입력해주세요"
        required
      />

      {isPending || isLoading ? (
        <div className="flex flex-col gap-2">
          <LineSkeleton h={2} />
          <LineSkeleton h={2} />
          <LineSkeleton h={2} />
        </div>
      ) : data?.stockCodeList.length > 0 ? (
        <div className="flex flex-col gap-2">
          <Text.CAPTION text={`총: ${data?.total}건`} className="text-end" />
          <InfinityList hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage}>
            {data!.stockCodeList.map(renderItem)}
          </InfinityList>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Text.CAPTION text={`총: ${data?.total}건`} className="text-end" />
          <Text.HEADING text="검색된 종목이 없습니다." className="text-center" />
        </div>
      )}
    </div>
  );
}
