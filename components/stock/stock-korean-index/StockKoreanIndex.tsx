'use client';

import { useDeviceLayout } from '@/hooks';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';

import { LineSkeleton } from '@/components/skeleton';
import { NetworkErrorText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useKoreanStockIndex } from '@/hooks/stock-index';

import { StockPriceText } from '../stock-price';

interface IStockIndexData {
  jisu: string;
  sign: string;
  change: string;
  drate: string;
  highjisu: string;
  lowjisu: string;
  time: string;
}

export const StockKoreanIndex = () => {
  const { isMobile } = useDeviceLayout();

  const { kospi, kosdaq, loading, isConnected } = useKoreanStockIndex({ isKospi: true, isKosdaq: true });

  const formatTime = (time: string) => {
    return `${time.slice(0, 2)}:${time.slice(2, 4)}:${time.slice(4, 6)}`;
  };

  const titleComponent = (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Text.HEADING text="국내 지수" />
        {isConnected && kospi && <Text.CAPTION text={formatTime(kospi.time)} color="gray" className="text-nowrap" />}
      </div>
      <Text.CAPTION text="10초마다 갱신됩니다." color="gray" className="text-end" />
    </div>
  );

  const RenderMarquee = (props: { indexData: IStockIndexData; title: string; href: string }) => {
    const { indexData, title, href } = props;

    return (
      <Link href={href}>
        <Text.HEADING text={title} />
        <Marquee speed={20} pauseOnHover={true} gradient={false}>
          <div className="flex items-center gap-4">
            <div className="min-w-20 flex flex-col items-end">
              <Text.PARAGRAPH text="지수" className="text-end" />
              <StockPriceText
                price={(+indexData.jisu).toLocaleString()}
                sign={indexData.sign}
                size="HEADING"
                className="text-end"
              />
            </div>

            <div className="min-w-24 flex flex-col items-end">
              <Text.PARAGRAPH text="변동" className="text-end" />
              <StockPriceText
                price={`${indexData.change}(${indexData.drate}%)`}
                sign={indexData.sign}
                size="PARAGRAPH"
                className="text-end"
              />
            </div>

            <div className="min-w-20 flex flex-col items-end">
              <Text.PARAGRAPH text="최고" className="text-end" />
              <Text.HEADING text={indexData.highjisu} />
            </div>

            <div className="min-w-20 flex flex-col items-end">
              <Text.PARAGRAPH text="최저" className="text-end" />
              <Text.HEADING text={indexData.lowjisu} />
            </div>
          </div>
        </Marquee>
      </Link>
    );
  };

  const Render = (props: { indexData: IStockIndexData; title: string; href: string }) => {
    const { indexData, title, href } = props;

    return (
      <Link href={href} className="w-full">
        <div className="w-full flex justify-evenly items-center">
          <Text.HEADING text={title} />

          <div className="min-w-20 flex flex-col items-end">
            <Text.PARAGRAPH text="지수" className="text-end" />
            <StockPriceText
              price={(+indexData.jisu).toLocaleString()}
              sign={indexData.sign}
              size="HEADING"
              className="text-end"
            />
          </div>

          <div className="min-w-24 flex flex-col items-end">
            <Text.PARAGRAPH text="변동" className="text-end" />
            <StockPriceText
              price={`${indexData.change}(${indexData.drate}%)`}
              sign={indexData.sign}
              size="PARAGRAPH"
              className="text-end"
            />
          </div>

          <div className="min-w-20 flex flex-col items-end">
            <Text.PARAGRAPH text="최고" className="text-end" />
            <Text.HEADING text={indexData.highjisu} />
          </div>

          <div className="min-w-20 flex flex-col items-end">
            <Text.PARAGRAPH text="최저" className="text-end" />
            <Text.HEADING text={indexData.lowjisu} />
          </div>
        </div>
      </Link>
    );
  };

  if (isMobile === null) {
    return (
      <Wrapper.SECTION>
        {titleComponent}
        <LineSkeleton />
      </Wrapper.SECTION>
    );
  }

  if (loading) {
    return (
      <Wrapper.SECTION>
        {titleComponent}
        <LineSkeleton />
      </Wrapper.SECTION>
    );
  }

  if (!isConnected) {
    return (
      <Wrapper.SECTION>
        {titleComponent}
        <NetworkErrorText />
      </Wrapper.SECTION>
    );
  }

  if (isMobile) {
    return (
      <Wrapper.SECTION>
        {titleComponent}

        {kospi && <RenderMarquee indexData={kospi} title="코스피" href="/index/kospi" />}
        {kosdaq && <RenderMarquee indexData={kosdaq} title="코스닥" href="/index/kosdaq" />}
      </Wrapper.SECTION>
    );
  }

  return (
    <Wrapper.SECTION>
      {titleComponent}

      <div className="flex flex-col items-center gap-4">
        {kospi && <Render indexData={kospi} title="코스피" href="/index/kospi" />}
        {kosdaq && <Render indexData={kosdaq} title="코스닥" href="/index/kosdaq" />}
      </div>
    </Wrapper.SECTION>
  );
};
