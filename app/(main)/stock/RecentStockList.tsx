'use client';

import { DayjsUtil, LocalStorageUtil } from '@/utils';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Text } from '@/components/text';

import { StockKoreanCompanyModel } from '@/services/stock';

import { LocalStorageKey } from '@/shared/constant/local-storage-key';

export default function RecentStockList() {
  const [searches, setSearches] = useState<(StockKoreanCompanyModel & { timestamp: Date })[]>([]);

  const handleRemove = (event: React.MouseEvent<SVGElement, MouseEvent>, id: number) => {
    event.preventDefault();
    event.stopPropagation();

    const updated = searches.filter((item) => item.id !== id);
    setSearches(updated);
    LocalStorageUtil.setItem(LocalStorageKey.recentStock, JSON.stringify(updated));
  };

  useEffect(() => {
    const stored = LocalStorageUtil.getItem(LocalStorageKey.recentStock);
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
          <Link key={item.id} href={`/stock/detail/${item.code}`}>
            <li className="flex items-center gap-2 rounded-lg px-2 py-1 bg-theme-bg-main">
              <div className="flex flex-col text-end">
                <Text.HEADING text={item.companyName} className="text-nowrap" />
                <Text.CAPTION text={DayjsUtil.of(item.timestamp).formatMMDD()} className="text-nowrap" />
              </div>

              <X onClick={(event) => handleRemove(event, item.id)} />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
