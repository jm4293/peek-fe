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
      <div>
        <div className="flex items-center gap-2">
          <Text.HEADING text="코스피" nowrap className="text-end" />
          <Text.HEADING
            text={kospi.jisu}
            color={`${kospi.sign === '2' ? 'red' : kospi.sign === '5' ? 'blue' : 'default'}`}
            nowrap
            className="text-end"
          />
          <Text.PARAGRAPH
            text={`${kospi.change}(${kospi.drate}%)`}
            color={`${kospi.sign === '2' ? 'red' : kospi.sign === '5' ? 'blue' : 'default'}`}
            nowrap
          />
        </div>
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text={`최고 ${kospi.highjisu}`} color="gray" nowrap />
          <Text.PARAGRAPH text={`최저 ${kospi.lowjisu}`} color="gray" nowrap />
          <Text.CAPTION
            text={kospi.time.slice(0, 2) + ':' + kospi.time.slice(2, 4) + ':' + kospi.time.slice(4, 6)}
            color="gray"
            nowrap
          />
        </div>
      </div>

      {kospi && <ChartStockIndex data={kospi} />}
    </Wrapper.SECTION>
  );
}
