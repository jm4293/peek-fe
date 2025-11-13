'use client';

import { DayjsUtil } from '@/utils';
import { ChevronRight } from 'lucide-react';
import Marquee from 'react-fast-marquee';

import { LineSkeleton } from '@/components/skeleton';
import { NetworkErrorText, Text } from '@/components/text';
import { EmptyDataView, Wrapper } from '@/components/wrapper';

import { useCurrencyList } from '@/services/currency/query';

export const Currency = () => {
  const { data, isPending, isSuccess } = useCurrencyList();

  const CurrencyWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Wrapper.SECTION>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Text.HEADING text="환율" />
            {isSuccess && data.length > 0 && <Text.CAPTION text={DayjsUtil.of(data[0].createdAt).formatMMDDHHmmss()} />}
          </div>
          {isSuccess && data && (
            <div className="flex items-center gap-2">
              <Text.CAPTION text="10초마다 갱신됩니다." color="gray" className="text-end" />
              <ChevronRight />
            </div>
          )}{' '}
        </div>
        {children}
      </Wrapper.SECTION>
    );
  };

  if (isPending) {
    return (
      <CurrencyWrapper>
        <LineSkeleton />
      </CurrencyWrapper>
    );
  }

  if (!isSuccess) {
    return (
      <CurrencyWrapper>
        <NetworkErrorText />
      </CurrencyWrapper>
    );
  }

  if (data.length === 0) {
    return (
      <CurrencyWrapper>
        <EmptyDataView text="환율 데이터" className="text-center" />
      </CurrencyWrapper>
    );
  }

  return (
    <CurrencyWrapper>
      <Marquee speed={30} pauseOnHover={true} gradient={false}>
        {data.map((item) => (
          <div key={item.curUnit} className="flex flex-col items-center gap-4 mr-8">
            <Text.HEADING text={item.curNm} />

            <div>
              <Text.CAPTION text="매매 기준" className="text-end" />
              <Text.HEADING text={item.dealBasR} />
            </div>

            <div>
              <Text.CAPTION text="받으실 때" className="text-end" />
              <Text.HEADING text={item.ttb} className="text-nowrap text-end" />
            </div>

            <div>
              <Text.CAPTION text="보내실 때" className="text-end" />
              <Text.HEADING text={item.tts} className="text-nowrap text-end" />
            </div>
          </div>
        ))}
      </Marquee>
    </CurrencyWrapper>
  );

  // return (
  //   <Wrapper.SECTION>
  //     {titleComponent}

  //     <div className="flex flex-col gap-4">
  //       {data.map((item) => (
  //         <div key={item.curUnit} className="w-full flex justify-evenly items-center">
  //           <Text.HEADING className="min-w-20" text={item.curNm} />

  //           <div className="min-w-20 flex flex-col">
  //             <Text.PARAGRAPH text="매매 기준" className="text-end" />
  //             <Text.HEADING text={item.dealBasR} className="text-nowrap text-end" />
  //           </div>

  //           <div className="min-w-20 flex flex-col">
  //             <Text.PARAGRAPH text="받으실 때" className="text-end" />
  //             <Text.HEADING text={item.ttb} className="text-nowrap text-end" />
  //           </div>

  //           <div className="min-w-20 flex flex-col">
  //             <Text.PARAGRAPH text="보내실 때" className="text-end" />
  //             <Text.HEADING text={item.tts} className="text-nowrap text-end" />
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </Wrapper.SECTION>
  // );
};
