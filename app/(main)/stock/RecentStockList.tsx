'use client';

import { LocalStorage } from '@/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import { Text } from '@/components/text';

import { IStockCompanyModel } from '@/services/stock';

import { LocalStorageKey } from '@/shared/constant/local-storage-key';

interface IProps {
  children: React.ReactNode;
}

export default function RecentStockList(props: IProps) {
  const { children } = props;
  const router = useRouter();

  const [searches, setSearches] = useState<IStockCompanyModel[]>([]);

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
        {children}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Text.HEADING text="최근 검색한 종목" />
        {children}
      </div>
      <ul className="flex gap-2 flex-nowrap overflow-x-auto">
        {searches.map((item: IStockCompanyModel) => (
          <li
            key={item.id}
            className="flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 shadow text-center bg-theme-bg-main"
            onClick={() => handleClick(item)}>
            <Text.HEADING text={item.companyName} />
            <IoMdClose onClick={(event) => handleRemove(event, item.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
