'use client';

import { ChartStockIndex } from '@/components/chart/stock-index';
import { LineSkeleton } from '@/components/skeleton';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useKoreanStockIndex } from '@/hooks/stock-index';

export default function KosdaqIndex() {
  const { kosdaq, loading } = useKoreanStockIndex({ isKospi: false, isKosdaq: true });

  if (loading) {
    return <LineSkeleton />;
  }

  if (!kosdaq) {
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
          text={kosdaq?.prpr_nmix}
          color={`${kosdaq?.prdy_vrss_sign === '2' ? 'red' : kosdaq?.prdy_vrss_sign === '5' ? 'blue' : 'default'}`}
          nowrap
          className="text-end"
        />

        <div className="flex items-center gap-1">
          <Text.PARAGRAPH
            text={`${kosdaq?.bstp_nmix_prdy_vrss}`}
            color={`${kosdaq?.prdy_vrss_sign === '2' ? 'red' : kosdaq?.prdy_vrss_sign === '5' ? 'blue' : 'default'}`}
            nowrap
          />
          <Text.PARAGRAPH
            text={`(${kosdaq?.prdy_clpr_vrss_lwpr_rate}%)`}
            color={`${kosdaq?.prdy_vrss_sign === '2' ? 'red' : kosdaq?.prdy_vrss_sign === '5' ? 'blue' : 'default'}`}
            nowrap
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Text.PARAGRAPH text={`최고 ${kosdaq?.nmix_hgpr}`} color="gray" nowrap />
        <Text.PARAGRAPH text={`최저 ${kosdaq?.nmix_lwpr}`} color="gray" nowrap />
        <Text.CAPTION
          text={
            kosdaq?.bsop_hour.slice(0, 2) + ':' + kosdaq?.bsop_hour.slice(2, 4) + ':' + kosdaq?.bsop_hour.slice(4, 6)
          }
          color="gray"
          nowrap
        />
      </div>

      <ChartStockIndex data={kosdaq} />
    </Wrapper.SECTION>
  );
}
