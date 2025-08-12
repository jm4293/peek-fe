'use client';

import { EditableText } from '@/components/text';
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
    <Wrapper>
      <div className="flex items-center gap-4">
        {stockCategoryList.reduce(
          (acc, cur) => {
            acc.push(
              <EditableText.HEADING
                key={cur.id}
                text={cur.name}
                color={category === String(cur.id) ? 'black' : 'gray'}
                onClick={() => handleCategoryClick(cur)}
              />,
            );
            return acc;
          },
          [
            <EditableText.HEADING
              key="all"
              text="전체"
              color={category === null ? 'black' : 'gray'}
              onClick={() => setQuery('category', null)}
            />,
          ],
        )}
      </div>
    </Wrapper>
  );
}
