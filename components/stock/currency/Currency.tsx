'use client';

import { DayjsUtil } from '@/utils';
import Marquee from 'react-fast-marquee';

import { LineSkeleton } from '@/components/skeleton';
import { NetworkErrorText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useCurrencyList } from '@/services/currency/query';

const TITLE = () => {
  return (
    <div className="flex justify-between items-center">
      <Text.HEADING text="환율" />
      <Text.CAPTION text="1분마다 갱신됩니다." color="gray" className="text-end" />
    </div>
  );
};

export const Currency = () => {
  const { data, isLoading, isSuccess } = useCurrencyList();

  if (isLoading) {
    return (
      <Wrapper.SECTION>
        <TITLE />

        <LineSkeleton />
      </Wrapper.SECTION>
    );
  }

  if (!isSuccess) {
    return (
      <Wrapper.SECTION>
        <TITLE />

        <NetworkErrorText />
      </Wrapper.SECTION>
    );
  }

  return (
    <Wrapper.SECTION>
      <TITLE />

      {data.length > 0 ? (
        <Marquee speed={20} pauseOnHover={true} gradient={false} gradientWidth={40}>
          {data.map((item) => (
            <div key={item.id} className="flex flex-col mx-4">
              <div className="flex items-center gap-2">
                <Text.HEADING text={item.curUnit} className="text-nowrap" />
                <Text.HEADING text={item.standard} className="text-nowrap text-end" />
              </div>

              <div className="flex justify-end items-center gap-2">
                <Text.PARAGRAPH
                  text={DayjsUtil.of(item.createdAt).formatHHmmss()}
                  color="gray"
                  className="text-nowrap text-end"
                />
              </div>
            </div>
          ))}
        </Marquee>
      ) : (
        <div className="text-center py-4">
          <Text.HEADING text="환율 데이터가 없습니다." />
        </div>
      )}
    </Wrapper.SECTION>
  );
};
