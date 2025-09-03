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
      <div>
        <div className="flex items-center gap-2">
          <Text.HEADING text="코스닥" nowrap className="text-end" />
          <Text.HEADING
            text={kosdaq.jisu}
            color={`${kosdaq.sign === '2' ? 'red' : kosdaq.sign === '5' ? 'blue' : 'default'}`}
            nowrap
            className="text-end"
          />
          <Text.PARAGRAPH
            text={`${kosdaq.change}(${kosdaq.drate}%)`}
            color={`${kosdaq.sign === '2' ? 'red' : kosdaq.sign === '5' ? 'blue' : 'default'}`}
            nowrap
          />
        </div>
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text={`최고 ${kosdaq.highjisu}`} color="gray" nowrap />
          <Text.PARAGRAPH text={`최저 ${kosdaq.lowjisu}`} color="gray" nowrap />
          <Text.CAPTION
            text={kosdaq.time.slice(0, 2) + ':' + kosdaq.time.slice(2, 4) + ':' + kosdaq.time.slice(4, 6)}
            color="gray"
            nowrap
          />
        </div>
      </div>

      {kosdaq && <ChartStockIndex data={kosdaq} />}
    </Wrapper.SECTION>
  );
}
