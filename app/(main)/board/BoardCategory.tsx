'use client';

import { useDeviceLayout } from '@/hooks';
import Link from 'next/link';

import { Text } from '@/components/text';
import { InternalErrorView, LoadingView, Wrapper } from '@/components/wrapper';

import { useQueryParams } from '@/hooks/queryParams';

import { useStockCategoryList } from '@/services/stock';

export default function BoardCategory() {
  const { getQuery } = useQueryParams();
  const stockCategory = getQuery('stockCategory');

  const { data, isPending, isSuccess } = useStockCategoryList();
  const { isMobile } = useDeviceLayout();

  if (isPending) {
    return <LoadingView />;
  }

  if (!isSuccess) {
    return <InternalErrorView />;
  }

  return (
    <div className={`sticky z-40 ${isMobile ? 'top-14' : 'top-20'}`}>
      <Wrapper.SECTION>
        <div className="flex gap-8">
          <Link href="/board">
            <Text.HEADING
              text="전체"
              color={stockCategory === null ? 'default' : 'gray'}
              className="whitespace-nowrap"
            />
          </Link>

          {data.map((cur) => (
            <Link key={cur.id} href={`/board?stockCategory=${cur.id}`}>
              <Text.HEADING
                text={cur.name}
                color={stockCategory === cur.id.toString() ? 'default' : 'gray'}
                className="whitespace-nowrap"
              />
            </Link>
          ))}
        </div>
      </Wrapper.SECTION>
    </div>
  );
}
