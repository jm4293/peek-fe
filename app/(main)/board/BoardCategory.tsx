'use client';

import Link from 'next/link';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useQueryParams } from '@/hooks/queryParams';

import { IStockCategoryListRes } from '@/services/stock';

interface IProps extends IStockCategoryListRes {}

export default function BoardCategory(props: IProps) {
  const { stockCategoryList } = props;

  const { getQuery, setQuery } = useQueryParams();
  const category = getQuery('category');

  return (
    <Wrapper.SECTION text="카테고리">
      <div className="flex items-center gap-4">
        <Link href="/board">
          <Text.HEADING text="전체" color={category === null ? 'default' : 'gray'} />
        </Link>

        {stockCategoryList.map((cur) => (
          <Link key={cur.id} href={`/board?category=${cur.id}`}>
            <Text.HEADING text={cur.name} color={category === cur.id.toString() ? 'default' : 'gray'} />
          </Link>
        ))}
      </div>
    </Wrapper.SECTION>
  );
}
