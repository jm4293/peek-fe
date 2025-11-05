'use client';

import Link from 'next/link';

import { LineSkeleton } from '@/components/skeleton';
import { Text } from '@/components/text';
import { InternalErrorView, Wrapper } from '@/components/wrapper';

import { useQueryParams } from '@/hooks/queryParams';

import { useStockCategoryList } from '@/services/stock';

export default function BoardCategory() {
  const { getQuery } = useQueryParams();
  const stockCategory = getQuery('stockCategory');

  const { data, isPending, isSuccess } = useStockCategoryList();

  if (isPending) {
    return (
      <Wrapper.SECTION text="카테고리">
        <LineSkeleton />
      </Wrapper.SECTION>
    );
  }

  if (!isSuccess) {
    return (
      <Wrapper.MAIN text="커뮤니티">
        <InternalErrorView />
      </Wrapper.MAIN>
    );
  }

  return (
    <Wrapper.SECTION text="카테고리">
      <div className="flex items-center gap-4">
        <Link href="/board">
          <Text.HEADING text="전체" color={stockCategory === null ? 'default' : 'gray'} />
        </Link>

        {data.map((cur) => (
          <Link key={cur.id} href={`/board?category=${cur.id}`}>
            <Text.HEADING text={cur.name} color={stockCategory === cur.id.toString() ? 'default' : 'gray'} />
          </Link>
        ))}
      </div>
    </Wrapper.SECTION>
  );
}
