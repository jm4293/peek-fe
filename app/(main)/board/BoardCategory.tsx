'use client';

import { useDeviceLayout } from '@/hooks';
import { useRouter } from 'next/navigation';

import { Tab } from '@/components/tab';
import { InternalErrorView, LoadingView, Wrapper } from '@/components/wrapper';

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

    // 같은 탭에서 로컬스토리지 변경을 감지하기 위한 커스텀 이벤트 발생
    window.dispatchEvent(new Event('localStorageChange'));

    router.push(`/board?stockCategory=${value}`);
  };

  const tabItems = data.map((category) => ({
    value: category.id.toString(),
    label: category.name,
  }));

  if (isMobile) {
    return (
      <div className="sticky z-40 top-16 flex flex-col gap-4">
        <Tab
          items={tabItems}
          value={stockCategory || undefined}
          onChange={handleCategoryChange}
          direction="horizontal"
          size="sm"
        />
      </div>
    );
  }

  return (
    <div className="sticky z-40 top-20 flex flex-col gap-4">
      <Tab items={tabItems} value={stockCategory || undefined} onChange={handleCategoryChange} size="sm" />
    </div>
  );
}
