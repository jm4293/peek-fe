'use client';

import Link from 'next/link';
import Marquee from 'react-fast-marquee';

import { LineSkeleton } from '@/components/skeleton';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useKoreanStockIndex } from '@/hooks/stock-index';

export const StockKoreanIndex = () => {
  const { kospi, kosdaq, loading } = useKoreanStockIndex({ isKospi: true, isKosdaq: true });

  if (loading) {
    return (
      <Wrapper.SECTION>
        <div className="flex justify-between items-center">
          <Text.PARAGRAPH text="지수" />
          <Text.CAPTION text="10초마다 갱신됩니다." color="gray" className="text-end" />
        </div>

        <LineSkeleton />
      </Wrapper.SECTION>
    );
  }

  return (
    <Wrapper.SECTION>
      <div className="flex justify-between items-center">
        <Text.HEADING text="국내 지수" />
        <Text.CAPTION text="10초마다 갱신됩니다." color="gray" className="text-end" />
      </div>

      <Marquee speed={20} pauseOnHover={true} gradient={true} gradientWidth={40}>
        <div className="mx-12">
          {kospi ? (
            <Link href="/index/kospi">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Text.HEADING text="코스피" nowrap className="text-end" />

                  <Text.HEADING
                    text={kospi.prpr_nmix}
                    color={`${kospi.prdy_vrss_sign === '2' ? 'red' : kospi.prdy_vrss_sign === '5' ? 'blue' : 'default'}`}
                    nowrap
                    className="text-end"
                  />

                  <div className="flex items-center gap-1">
                    <Text.PARAGRAPH
                      text={`${kospi.bstp_nmix_prdy_vrss}`}
                      color={`${kospi.prdy_vrss_sign === '2' ? 'red' : kospi.prdy_vrss_sign === '5' ? 'blue' : 'default'}`}
                      nowrap
                    />
                    <Text.PARAGRAPH
                      text={`(${kospi.prdy_clpr_vrss_lwpr_rate}%)`}
                      color={`${kospi.prdy_vrss_sign === '2' ? 'red' : kospi.prdy_vrss_sign === '5' ? 'blue' : 'default'}`}
                      nowrap
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Text.PARAGRAPH text={`최고 ${kospi.nmix_hgpr}`} color="gray" nowrap />
                  <Text.PARAGRAPH text={`최저 ${kospi.nmix_lwpr}`} color="gray" nowrap />
                  <Text.CAPTION
                    text={
                      kospi.bsop_hour.slice(0, 2) +
                      ':' +
                      kospi.bsop_hour.slice(2, 4) +
                      ':' +
                      kospi.bsop_hour.slice(4, 6)
                    }
                    color="gray"
                    nowrap
                  />
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Text.HEADING text="코스피" nowrap />
              <Text.PARAGRAPH text="데이터가 없습니다." color="gray" nowrap />
            </div>
          )}
        </div>
        <div>
          {kosdaq ? (
            <Link href="/index/kosdaq">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Text.HEADING text="코스닥" nowrap className="text-end" />

                  <Text.HEADING
                    text={kosdaq.prpr_nmix}
                    color={`${kosdaq.prdy_vrss_sign === '2' ? 'red' : kosdaq.prdy_vrss_sign === '5' ? 'blue' : 'default'}`}
                    nowrap
                    className="text-end"
                  />

                  <div className="flex items-center gap-1">
                    <Text.PARAGRAPH
                      text={`${kosdaq.bstp_nmix_prdy_vrss}`}
                      color={`${kosdaq.prdy_vrss_sign === '2' ? 'red' : kosdaq.prdy_vrss_sign === '5' ? 'blue' : 'default'}`}
                      nowrap
                    />
                    <Text.PARAGRAPH
                      text={`(${kosdaq.prdy_clpr_vrss_lwpr_rate}%)`}
                      color={`${kosdaq.prdy_vrss_sign === '2' ? 'red' : kosdaq.prdy_vrss_sign === '5' ? 'blue' : 'default'}`}
                      nowrap
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Text.PARAGRAPH text={`최고 ${kosdaq.nmix_hgpr}`} color="gray" nowrap />
                  <Text.PARAGRAPH text={`최저 ${kosdaq.nmix_lwpr}`} color="gray" nowrap />
                  <Text.CAPTION
                    text={
                      kosdaq.bsop_hour.slice(0, 2) +
                      ':' +
                      kosdaq.bsop_hour.slice(2, 4) +
                      ':' +
                      kosdaq.bsop_hour.slice(4, 6)
                    }
                    color="gray"
                    nowrap
                  />
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Text.HEADING text="코스닥" nowrap />
              <Text.PARAGRAPH text="데이터가 없습니다." color="gray" nowrap />
            </div>
          )}
        </div>
      </Marquee>
    </Wrapper.SECTION>
  );
};
