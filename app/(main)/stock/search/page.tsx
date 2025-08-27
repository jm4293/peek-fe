import { Wrapper } from '@/components/wrapper';

import StockSearch from './StockSearch';

export default function Page() {
  return (
    <Wrapper.MAIN text="종목 검색">
      <StockSearch />
    </Wrapper.MAIN>
  );
}
