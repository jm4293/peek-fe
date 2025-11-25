'use client';

import { DayjsUtil } from '@/utils';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

import auFlag from '@/assets/country/au.png';
import cnFlag from '@/assets/country/cn.png';
import euFlag from '@/assets/country/eu.png';
import jpFlag from '@/assets/country/jp.png';
import krFlag from '@/assets/country/kr.png';
import ukFlag from '@/assets/country/uk.png';
import usFlag from '@/assets/country/us.png';

import { LineSkeleton } from '@/components/skeleton';
import { NetworkErrorText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useCurrencyList } from '@/services/currency/query';

const currencyMap = {
  JPY: jpFlag,
  KRW: krFlag,
  USD: usFlag,
  EUR: euFlag,
  GBP: ukFlag,
  AUD: auFlag,
  CNH: cnFlag,
};

export const Currency = () => {
  const { data, isPending, isSuccess } = useCurrencyList();

  const CurrencyWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Wrapper.SECTION>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Text.HEADING text="환율" />
            {isSuccess && data.length > 0 && <Text.CAPTION text={DayjsUtil.of(data[0].createdAt).formatMMDDHHmmss()} />}
          </div>
          {isSuccess && data && (
            <div className="flex items-center gap-2">
              <Text.CAPTION text="10초마다 갱신됩니다." color="gray" className="text-end" />
              <ChevronRight />
            </div>
          )}
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
        <Text.PARAGRAPH text="환율 데이터가 없습니다." className="text-center" />
      </CurrencyWrapper>
    );
  }

  return (
    <CurrencyWrapper>
      {data.map((item) => (
        <div key={item.uuid} className="flex flex-col gap-1">
          <div className="flex gap-2">
            <Image
              src={currencyMap[item.curUnit as keyof typeof currencyMap]}
              alt={item.curNm}
              width={20}
              height={20}
            />
            <Text.HEADING text={`${item.curNm}(${item.curUnitDesc})`} />
          </div>

          <div className="flex justify-center gap-4">
            <div className="flex flex-col">
              <Text.PARAGRAPH text="매매 기준" className="text-end" />
              <Text.HEADING text={item.dealBasR} />
            </div>
            <div className="flex flex-col">
              <Text.PARAGRAPH text="받으실 때" className="text-end" />
              <Text.HEADING text={item.ttb} />
            </div>
            <div className="flex flex-col">
              <Text.PARAGRAPH text="보내실 때" className="text-end" />
              <Text.HEADING text={item.tts} />
            </div>
          </div>
        </div>
      ))}
    </CurrencyWrapper>
  );
};
