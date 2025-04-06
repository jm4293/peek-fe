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
    <>
      <div className="flex justify-end items-center gap-1 border-b-2 border-gray-200">
        <Text value="총" size="lg" />
        <Text value={`${String(total)}개`} />
      </div>

      <div>{renderList}</div>
    </>
  );
}
