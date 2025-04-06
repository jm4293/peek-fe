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
        <Text value="총" color="#000000" size="lg" />
        <Text value={`${String(total)}개`} color="#000000" />
      </div>

      <div>{renderList}</div>
    </>
  );
}
