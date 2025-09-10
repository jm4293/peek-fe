'use client';

import { Clickable } from '@/components/interactive';
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
        <Clickable key="all" onClick={() => setQuery('category', null)}>
          <Text.HEADING text="전체" color={category === null ? 'default' : 'gray'} />
        </Clickable>

        {stockCategoryList.map((cur) => {
          return (
            <Clickable key={cur.id} onClick={() => setQuery('category', cur.id.toString())}>
              <Text.HEADING text={cur.name} color={category === cur.id.toString() ? 'default' : 'gray'} />
            </Clickable>
          );
        })}
      </div>
    </Wrapper.SECTION>
  );
}
