'use client';

import { JSX } from 'react';
import Text from '@/components/text/text';
import Wrapper from '@/components/wrapper/wrapper';

interface IProps {
  total: number | undefined;
  renderList: JSX.Element;
}

export default function InfinityListWrapper(props: IProps) {
  const { total = 0, renderList } = props;

  return (
    <div className="w-full flex flex-col gap-4">
      <Wrapper>
        <div className="flex justify-end items-center gap-1">
          <Text value="총" size="lg" />
          <Text value={`${String(total)}개`} />
        </div>
      </Wrapper>

      <>{renderList}</>
    </div>
  );
}
