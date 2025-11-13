'use client';

import { JSX } from 'react';

import { Text } from '../text';
import { Wrapper } from '../wrapper';

interface Props {
  total: number | undefined;
  children: JSX.Element;
  title?: string | JSX.Element;
}

export const InfinityListWrapper = (props: Props) => {
  const { total = 0, children, title } = props;

  return (
    <div className="w-full flex flex-col gap-4">
      <Wrapper.SECTION>
        <div className="flex justify-between items-center">
          <div>{title && title}</div>
          <Text.PARAGRAPH text={`${String(total)}개`} />
        </div>
      </Wrapper.SECTION>

      <>{children}</>
    </div>
  );
};
