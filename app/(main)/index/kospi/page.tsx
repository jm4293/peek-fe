import { Wrapper } from '@/components/wrapper';

import KospiChart from './KospiIndex';

export default function KospiIndexPage() {
  return (
    <Wrapper.MAIN text="코스피 상세">
      <KospiChart />
    </Wrapper.MAIN>
  );
}
