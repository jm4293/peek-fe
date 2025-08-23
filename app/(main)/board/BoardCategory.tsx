'use client';

import { Clickable } from '@/components/interactive';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useQueryParams } from '@/hooks/queryParams';

import { IStockCategoryListRes, IStockCategoryModel } from '@/services/stock';

interface IProps extends IStockCategoryListRes {}

export default function BoardCategory(props: IProps) {
  const { stockCategoryList } = props;

  const { getQuery, setQuery } = useQueryParams();
  const category = getQuery('category');

  const handleCategoryClick = (category: IStockCategoryModel) => {
    setQuery('category', category.id.toString());
  };

  return (
    <Wrapper.SECTION text="카테고리">
      <div className="flex items-center gap-4">
        {stockCategoryList.reduce(
          (acc, cur) => {
            if (category === String(cur.id)) {
              acc.push(
                <Clickable key={cur.id} onClick={() => handleCategoryClick(cur)}>
                  <Text.HEADING text={cur.enName} color={category === String(cur.id) ? 'default' : 'gray'} />
                </Clickable>,
              );
            } else {
              acc.push(
                <Clickable key={cur.id} onClick={() => handleCategoryClick(cur)}>
                  <Text.PARAGRAPH text={cur.enName} color={category === String(cur.id) ? 'default' : 'gray'} />
                </Clickable>,
              );
            }

            return acc;
          },
          [
            category === null ? (
              <Clickable key="all" onClick={() => setQuery('category', null)}>
                <Text.HEADING text="전체" color={category === null ? 'default' : 'gray'} />
              </Clickable>
            ) : (
              <Clickable key="all" onClick={() => setQuery('category', null)}>
                <Text.PARAGRAPH text="전체" color={category === null ? 'default' : 'gray'} />
              </Clickable>
            ),
          ],
        )}
      </div>
    </Wrapper.SECTION>
  );
}
