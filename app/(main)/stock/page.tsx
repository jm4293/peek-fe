import { CurrentTimeText } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import PopularStock from './PopularStock';
import RecentStockList from './RecentStockList';

export default function Page() {
  return (
    <Wrapper.MAIN text="주식">
      <CurrentTimeText />

      <Wrapper.SECTION>
        <RecentStockList />
      </Wrapper.SECTION>

      <Wrapper.SECTION>
        <PopularStock />
      </Wrapper.SECTION>
    </Wrapper.MAIN>
  );
}
