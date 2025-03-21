'use server';

import { JSX } from 'react';
import TextServer from '@/components/text/textServer';

interface IProps {
  total: number | undefined;
  renderHeader?: JSX.Element;
  renderList?: JSX.Element;
}

export default async function InfinityListWrapper(props: IProps) {
  const { total = 0, renderHeader, renderList } = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <TextServer value="총" color="#000000" size="lg" />
          <div className="flex">
            <TextServer value={String(total)} color="#000000" />
            <TextServer value="개" color="#000000" />
          </div>
        </div>

        {renderHeader && <div>{renderHeader}</div>}
      </div>

      <div>{renderList}</div>
    </div>
  );
}
