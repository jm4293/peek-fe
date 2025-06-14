'use client';

import { JSX } from 'react';

import Text from '@/components/text/text';
import Wrapper from '@/components/wrapper/wrapper';

interface IProps {
  total: number | undefined;
  children: JSX.Element;
  title?: JSX.Element;
}

export default function InfinityListWrapper(props: IProps) {
  const { total = 0, children, title } = props;

  return (
    <div className="w-full flex flex-col gap-4">
      <Wrapper>
        <div className="flex justify-between items-center">
          <div>{title && title}</div>
          <Text value={`${String(total)}개`} />
        </div>
      </Wrapper>

      <>{children}</>
    </div>
  );
}
