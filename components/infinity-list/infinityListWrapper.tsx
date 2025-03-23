'use client';

import { JSX } from 'react';
import Text from '@/components/text/text';

interface IProps {
  total: number | undefined;
  renderList: JSX.Element;
}

export default function InfinityListWrapper(props: IProps) {
  const { total = 0, renderList } = props;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-1">
        <Text value="총" color="#000000" size="lg" />
        <Text value={`${String(total)}개`} color="#000000" />
      </div>

      <div>{renderList}</div>
    </div>
  );
}
