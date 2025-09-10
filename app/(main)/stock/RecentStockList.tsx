'use client';

import { Dayjs, LocalStorage } from '@/utils';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Text } from '@/components/text';

import { IStockCompanyModel } from '@/services/stock';

import { LocalStorageKey } from '@/shared/constant/local-storage-key';

export default function RecentStockList() {
  const router = useRouter();

  const [searches, setSearches] = useState<(IStockCompanyModel & { timestamp: Date })[]>([]);

  const handleClick = (item: IStockCompanyModel) => {
    router.push(`/stock/detail/${item.code}`);
  };

  const handleRemove = (event: React.MouseEvent<SVGElement, MouseEvent>, id: number) => {
    event.stopPropagation();

    const updated = searches.filter((item) => item.id !== id);
    setSearches(updated);
    LocalStorage.setItem(LocalStorageKey.recentStock, JSON.stringify(updated));
  };

  useEffect(() => {
    const stored = LocalStorage.getItem(LocalStorageKey.recentStock);
    setSearches(stored ? JSON.parse(stored) : []);
  }, []);

  if (searches.length === 0) {
    return (
      <div className="flex justify-between items-center">
        <Text.HEADING text="최근 검색한 종목이 없습니다." />
        <Link href="/stock/search" className="flex justify-end">
          <Text.HEADING text="종목 검색" color="blue" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Text.HEADING text="최근 검색한 종목" />

        <Link href="/stock/search" className="flex justify-end">
          <Text.HEADING text="종목 검색" color="blue" />
        </Link>
      </div>
      <ul className="flex items-center gap-4 flex-nowrap overflow-x-auto">
        {searches.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-2 rounded-lg px-2 py-1 bg-theme-bg-main"
            onClick={() => handleClick(item)}>
            <div className="flex flex-col text-end">
              <Text.HEADING text={item.companyName} nowrap />
              <Text.CAPTION text={Dayjs.of(item.timestamp).formatMMDD()} nowrap />
            </div>

            <X onClick={(event) => handleRemove(event, item.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
