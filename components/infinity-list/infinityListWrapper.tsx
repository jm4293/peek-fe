'use client';

import { JSX } from 'react';

import Text from '@/components/text/text';
import Wrapper from '@/components/wrapper/wrapper';

interface IProps {
  total: number | undefined;
  renderList: JSX.Element;
  titleRender?: JSX.Element;
}

export default function InfinityListWrapper(props: IProps) {
  const { total = 0, renderList, titleRender } = props;

  return (
    <div className="w-full flex flex-col gap-4">
      <Wrapper>
        <div className="flex justify-between items-center">
          <div>{titleRender && titleRender}</div>
          <Text value={`${String(total)}개`} />
        </div>
      </Wrapper>

      <>{renderList}</>
    </div>
  );
}
