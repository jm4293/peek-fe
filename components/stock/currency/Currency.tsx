'use client';

import { DayjsUtil } from '@/utils';
import { useMemo } from 'react';
import Marquee from 'react-fast-marquee';

import { LineSkeleton } from '@/components/skeleton';
import { NetworkErrorText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { ICurrencyModel } from '@/services/currency/model';
import { useCurrencyList } from '@/services/currency/query';

interface ICurrencyData extends ICurrencyModel {}

export const Currency = () => {
  const { data, isPending, isSuccess } = useCurrencyList();

  const titleComponent = useMemo(
    () => (
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Text.HEADING text="환율" />
          {isSuccess && data && data.length > 0 && (
            <Text.PARAGRAPH
              text={DayjsUtil.of(data[0].createdAt).formatHHmmss()}
              color="gray"
              className="text-nowrap text-end"
            />
          )}
        </div>
        <Text.CAPTION text="1분마다 갱신됩니다." color="gray" className="text-end" />
      </div>
    ),
    [isSuccess, data],
  );

  const CurrencyMarquee = ({ item }: { item: ICurrencyData }) => (
    <div key={item.curUnit}>
      <Text.HEADING text={item.curUnitDesc} />

      <Marquee speed={20} pauseOnHover={true} gradient={false}>
        <div className="flex items-center gap-4">
          <div className="min-w-20 flex flex-col">
            <Text.PARAGRAPH text="매매 기준" className="text-end" />
            <Text.HEADING text={item.dealBasR} className="text-nowrap text-end" />
          </div>

          <div className="min-w-20 flex flex-col">
            <Text.PARAGRAPH text="받으실 때" className="text-end" />
            <Text.HEADING text={item.ttb} className="text-nowrap text-end" />
          </div>

          <div className="min-w-20 flex flex-col">
            <Text.PARAGRAPH text="보내실 때" className="text-end" />
            <Text.HEADING text={item.tts} className="text-nowrap text-end" />
          </div>
        </div>
      </Marquee>
    </div>
  );

  const EmptyData = () => (
    <div className="text-center py-4">
      <Text.HEADING text="환율 데이터가 없습니다." />
    </div>
  );

  if (isPending) {
    return (
      <Wrapper.SECTION>
        {titleComponent}
        <LineSkeleton />
      </Wrapper.SECTION>
    );
  }

  if (!isSuccess) {
    return (
      <Wrapper.SECTION>
        {titleComponent}
        <NetworkErrorText />
      </Wrapper.SECTION>
    );
  }

  return (
    <Wrapper.SECTION>
      {titleComponent}

      {data && data.length > 0 ? data.map((item) => <CurrencyMarquee key={item.curUnit} item={item} />) : <EmptyData />}
    </Wrapper.SECTION>
  );
};
