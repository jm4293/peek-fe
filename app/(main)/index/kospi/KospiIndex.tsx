'use client';

import { ChartStockIndex } from '@/components/chart/stock-index';
import { LineSkeleton } from '@/components/skeleton';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useKoreanStockIndex } from '@/hooks/stock-index';

export default function KospiIndex() {
  const { kospi, loading } = useKoreanStockIndex({ isKospi: true, isKosdaq: false });

  if (loading) {
    return <LineSkeleton />;
  }

  if (!kospi) {
    return (
      <div className="flex items-center gap-2">
        <Text.HEADING text="코스피" nowrap />
        <Text.PARAGRAPH text="데이터가 없습니다." color="gray" nowrap />
      </div>
    );
  }

  return (
    <Wrapper.SECTION>
      <div className="flex items-center gap-2">
        <Text.HEADING text="코스피" nowrap className="text-end" />

        <Text.HEADING
          text={kospi?.prpr_nmix}
          color={`${kospi?.prdy_vrss_sign === '2' ? 'red' : kospi?.prdy_vrss_sign === '5' ? 'blue' : 'default'}`}
          nowrap
          className="text-end"
        />

        <div className="flex items-center gap-1">
          <Text.PARAGRAPH
            text={`${kospi?.bstp_nmix_prdy_vrss}`}
            color={`${kospi?.prdy_vrss_sign === '2' ? 'red' : kospi?.prdy_vrss_sign === '5' ? 'blue' : 'default'}`}
            nowrap
          />
          <Text.PARAGRAPH
            text={`(${kospi?.prdy_clpr_vrss_lwpr_rate}%)`}
            color={`${kospi?.prdy_vrss_sign === '2' ? 'red' : kospi?.prdy_vrss_sign === '5' ? 'blue' : 'default'}`}
            nowrap
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Text.PARAGRAPH text={`최고 ${kospi?.nmix_hgpr}`} color="gray" nowrap />
        <Text.PARAGRAPH text={`최저 ${kospi?.nmix_lwpr}`} color="gray" nowrap />
        <Text.CAPTION
          text={kospi?.bsop_hour.slice(0, 2) + ':' + kospi?.bsop_hour.slice(2, 4) + ':' + kospi?.bsop_hour.slice(4, 6)}
          color="gray"
          nowrap
        />
      </div>

      <ChartStockIndex data={kospi} />
    </Wrapper.SECTION>
  );
}
