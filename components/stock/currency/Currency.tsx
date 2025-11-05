'use client';

import { useDeviceLayout } from '@/hooks';
import { DayjsUtil } from '@/utils';
import Marquee from 'react-fast-marquee';

import { LineSkeleton } from '@/components/skeleton';
import { NetworkErrorText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useCurrencyList } from '@/services/currency/query';

export const Currency = () => {
  const { isMobile } = useDeviceLayout();

  const { data, isPending, isSuccess } = useCurrencyList();

  const titleComponent = (
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2">
        <Text.HEADING text="환율" />
        {isSuccess && data.length > 0 && <Text.PARAGRAPH text={DayjsUtil.of(data[0].createdAt).formatYYMMDDHHmm()} />}
      </div>
      <Text.CAPTION text="30초마다 갱신됩니다." color="gray" className="text-end" />
    </div>
  );

  const EmptyData = () => (
    <div className="text-center">
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

  if (data.length === 0) {
    return (
      <Wrapper.SECTION>
        {titleComponent}
        <EmptyData />
      </Wrapper.SECTION>
    );
  }

  if (isMobile) {
    return (
      <Wrapper.SECTION>
        {titleComponent}

        {data.map((item) => (
          <div key={item.curUnit}>
            <Text.HEADING text={item.curNm} />

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
        ))}
      </Wrapper.SECTION>
    );
  }

  return (
    <Wrapper.SECTION>
      {titleComponent}

      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <div key={item.curUnit} className="w-full flex justify-evenly items-center">
            <Text.HEADING className="min-w-20" text={item.curNm} />

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
        ))}
      </div>
    </Wrapper.SECTION>
  );
};
