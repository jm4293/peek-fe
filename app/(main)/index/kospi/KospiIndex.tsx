'use client';

import { ChartStockIndex } from '@/components/chart/stock-index';
import { LineSkeleton } from '@/components/skeleton';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useStockKoreanIndex } from '@/hooks/socket';

export default function KospiIndex() {
  const { kospi, loading } = useStockKoreanIndex({ isKospi: true, isKosdaq: false });

  if (loading) {
    return <LineSkeleton />;
  }

  if (!kospi) {
    return (
      <div className="flex items-center gap-2">
        <Text.HEADING text="코스피" className="text-nowrap" />
        <Text.PARAGRAPH text="데이터가 없습니다." color="gray" className="text-nowrap" />
      </div>
    );
  }

  return (
    <Wrapper.SECTION>
      <div>
        <div className="flex items-center gap-2">
          <Text.HEADING text="코스피" className="text-nowrap text-end" />
          <Text.HEADING
            text={kospi.jisu}
            color={`${kospi.sign === '2' ? 'red' : kospi.sign === '5' ? 'blue' : 'default'}`}
            className="text-nowrap text-end"
          />
          <Text.PARAGRAPH
            text={`${kospi.change}(${kospi.drate}%)`}
            color={`${kospi.sign === '2' ? 'red' : kospi.sign === '5' ? 'blue' : 'default'}`}
            className="text-nowrap"
          />
        </div>
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text={`최고 ${kospi.highjisu}`} color="gray" className="text-nowrap" />
          <Text.PARAGRAPH text={`최저 ${kospi.lowjisu}`} color="gray" className="text-nowrap" />
          <Text.CAPTION
            text={kospi.time.slice(0, 2) + ':' + kospi.time.slice(2, 4) + ':' + kospi.time.slice(4, 6)}
            color="gray"
            className="text-nowrap"
          />
        </div>
      </div>

      {kospi && <ChartStockIndex data={kospi} />}
    </Wrapper.SECTION>
  );
}
