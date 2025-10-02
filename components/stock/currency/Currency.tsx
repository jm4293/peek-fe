'use client';

import { DayjsUtil } from '@/utils';
import Marquee from 'react-fast-marquee';

import { LineSkeleton } from '@/components/skeleton';
import { NetworkErrorText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useCurrencyList } from '@/services/currency/query';

export const Currency = () => {
  const { data, isPending, isSuccess } = useCurrencyList();

  const TITLE = () => {
    return (
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Text.HEADING text="환율" />
          {isSuccess && data.length > 0 && (
            <Text.PARAGRAPH
              text={DayjsUtil.of(data[0].createdAt).formatHHmmss()}
              color="gray"
              className="text-nowrap text-end"
            />
          )}
        </div>
        <Text.CAPTION text="1분마다 갱신됩니다." color="gray" className="text-end" />
      </div>
    );
  };

  if (isPending) {
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
        data.map((item) => {
          return (
            <div key={item.curUnit}>
              <div>{item.curUnitDesc}</div>

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
        })
      ) : (
        <div className="text-center py-4">
          <Text.HEADING text="환율 데이터가 없습니다." />
        </div>
      )}
    </Wrapper.SECTION>
  );
};
