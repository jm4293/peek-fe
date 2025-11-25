'use client';

import Link from 'next/link';

import { LineSkeleton } from '@/components/skeleton';
import { NetworkErrorText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useStockUsIndex } from '@/hooks/socket';

import { UsStockIndex } from '@/shared/types/stock';

export const StockUsIndex = () => {
  const { dowJones, sp500, nasdaq, indexNasdaq, loading, isConnected } = useStockUsIndex();

  const StockUsIndexWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Wrapper.SECTION>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Text.HEADING text="미국 지수" />
            {/* {isConnected && kospi && (
              <Text.CAPTION text={DayjsUtil.of(kospi.createdAt).formatMMDDHHmmss()} className="text-nowrap" />
            )} */}
          </div>
          {/* {isConnected && kospi && <Text.CAPTION text="10초마다 갱신됩니다." color="gray" className="text-end" />} */}
        </div>
        {children}
      </Wrapper.SECTION>
    );
  };

  const Render = (props: { indexData: UsStockIndex; title: string; href: string }) => {
    const { indexData, title, href } = props;

    return (
      <Link href={href} className="flex flex-col justify-center items-center gap-2">
        <div className="flex flex-col items-center">
          <Text.HEADING text={title} />
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center">
            <Text.HEADING text={indexData.price} />
            <Text.PARAGRAPH text={`${indexData.change}(${indexData.uprate}%)`} />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <Text.PARAGRAPH text="최고" />
              <Text.PARAGRAPH text={indexData.high} />
            </div>
            <div className="flex flex-col items-center">
              <Text.PARAGRAPH text="최저" />
              <Text.PARAGRAPH text={indexData.low} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Text.PARAGRAPH text="한국시간" />
            <div className="flex items-center gap-2">
              <Text.CAPTION
                text={
                  indexData.date.slice(0, 4) +
                  '.' +
                  indexData.date.slice(4, 6) +
                  '.' +
                  indexData.date.slice(6, 8) +
                  ' ' +
                  indexData.kotime.slice(0, 2) +
                  ':' +
                  indexData.kotime.slice(2, 4) +
                  ':' +
                  indexData.kotime.slice(4, 6)
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Text.PARAGRAPH text="현지시간" />
            <div className="flex items-center gap-2">
              <Text.CAPTION
                text={
                  indexData.date.slice(0, 4) +
                  '.' +
                  indexData.date.slice(4, 6) +
                  '.' +
                  indexData.date.slice(6, 8) +
                  ' ' +
                  indexData.time.slice(0, 2) +
                  ':' +
                  indexData.time.slice(2, 4) +
                  ':' +
                  indexData.time.slice(4, 6)
                }
              />
            </div>
          </div>
        </div>
      </Link>
    );
  };

  if (loading) {
    return (
      <StockUsIndexWrapper>
        <LineSkeleton />
      </StockUsIndexWrapper>
    );
  }

  if (!isConnected) {
    return (
      <StockUsIndexWrapper>
        <NetworkErrorText />
      </StockUsIndexWrapper>
    );
  }

  return (
    <StockUsIndexWrapper>
      <div className="flex justify-center items-center gap-12">
        {/* {dowJones ? (
          <Render indexData={dowJones} title="다우존스" href="/index/dowjones" />
        ) : (
          <Text.PARAGRAPH text="다우존스 데이터가 없습니다." />
        )}

        {sp500 ? (
          <Render indexData={sp500} title="S&P 500" href="/index/sp500" />
        ) : (
          <Text.PARAGRAPH text="S&P 500 데이터가 없습니다." />
        )} */}

        {nasdaq ? (
          <Render indexData={nasdaq} title="나스닥" href="/index/nasdaq" />
        ) : (
          <Text.PARAGRAPH text="나스닥 데이터가 없습니다." />
        )}

        {indexNasdaq ? (
          <Render indexData={indexNasdaq} title="필라델피아 반도체" href="/index/nasdaq100" />
        ) : (
          <Text.PARAGRAPH text="필라델피아 반도체 데이터가 없습니다." />
        )}
      </div>
    </StockUsIndexWrapper>
  );
};
