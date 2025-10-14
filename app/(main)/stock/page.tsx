import { CurrentTimeText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import PopularStock from './PopularStock';
import RecentStockList from './RecentStockList';

export default function Page() {
  return (
    <Wrapper.MAIN
      text={
        <div className="flex items-center justify-between">
          <Text.TITLE text="주식" />
          <CurrentTimeText />
        </div>
      }>
      <Wrapper.SECTION>
        <RecentStockList />
      </Wrapper.SECTION>

      <Wrapper.SECTION>
        <PopularStock />
      </Wrapper.SECTION>
    </Wrapper.MAIN>
  );
}
