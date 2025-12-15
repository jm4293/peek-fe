'use client';

import { useDeviceLayout } from '@/hooks';
import { useRouter } from 'next/navigation';

import { Tab } from '@/components/tab';
import { InternalErrorView, LoadingView } from '@/components/wrapper';

import { useQueryParams } from '@/hooks/queryParams';

import { useStockCategoryList } from '@/services/stock';

import { LocalStorageKey } from '@/shared/constant/local-storage-key';

import { LocalStorageUtil } from '@/utils/local-storage.util';

export default function BoardCategory() {
  const router = useRouter();

  const { getQuery } = useQueryParams();
  const stockCategory = getQuery('stockCategory');

  const { isMobile } = useDeviceLayout();

  const { data, isPending, isSuccess } = useStockCategoryList();

  if (isPending) {
    return <LoadingView />;
  }

  if (!isSuccess) {
    return <InternalErrorView />;
  }

  const handleCategoryChange = (value: string | number) => {
    LocalStorageUtil.setItem(LocalStorageKey.boardStockCategory, value.toString());

    window.dispatchEvent(new Event('stockCategoryChange'));
    router.push(`/board?stockCategory=${value}`);
  };

  const tabItems = data.map((category) => ({
    value: category.id.toString(),
    label: category.name,
  }));

  return (
    <div className={`sticky z-40 flex flex-col gap-4 ${isMobile ? 'top-12' : 'top-16'}`}>
      <Tab items={tabItems} value={stockCategory || undefined} onChange={handleCategoryChange} size="sm" />
    </div>
  );
}
