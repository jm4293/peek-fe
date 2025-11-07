'use client';

import { ChartStockIndex } from '@/components/chart/stock-index';
import { LineSkeleton } from '@/components/skeleton';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useStockKoreanIndex } from '@/hooks/socket';

export default function KosdaqIndex() {
  const { kosdaq, loading } = useStockKoreanIndex({ isKospi: false, isKosdaq: true });

  if (loading) {
    return <LineSkeleton />;
  }

  if (!kosdaq) {
    return (
      <div className="flex items-center gap-2">
        <Text.HEADING text="코스닥" className="text-nowrap" />
        <Text.PARAGRAPH text="데이터가 없습니다." color="gray" className="text-nowrap" />
      </div>
    );
  }

  return (
    <Wrapper.SECTION>
      <div>
        <div className="flex items-center gap-2">
          <Text.HEADING text="코스닥" className="text-nowrap text-end" />
          <Text.HEADING
            text={kosdaq.jisu}
            color={`${kosdaq.sign === '2' ? 'red' : kosdaq.sign === '5' ? 'blue' : 'default'}`}
            className="text-nowrap text-end"
          />
          <Text.PARAGRAPH
            text={`${kosdaq.change}(${kosdaq.drate}%)`}
            color={`${kosdaq.sign === '2' ? 'red' : kosdaq.sign === '5' ? 'blue' : 'default'}`}
            className="text-nowrap"
          />
        </div>
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text={`최고 ${kosdaq.highjisu}`} color="gray" className="text-nowrap" />
          <Text.PARAGRAPH text={`최저 ${kosdaq.lowjisu}`} color="gray" className="text-nowrap" />
          <Text.CAPTION
            text={kosdaq.time.slice(0, 2) + ':' + kosdaq.time.slice(2, 4) + ':' + kosdaq.time.slice(4, 6)}
            color="gray"
            className="text-nowrap"
          />
        </div>
      </div>

      {kosdaq && <ChartStockIndex data={kosdaq} />}
    </Wrapper.SECTION>
  );
}
