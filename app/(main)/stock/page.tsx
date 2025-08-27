import Link from 'next/link';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import PopularStock from './PopularStock';

export default function Page() {
  return (
    <Wrapper.MAIN text="주식">
      <Wrapper.SECTION>
        <Link href="/stock/search" className="flex justify-end">
          <Text.HEADING text="종목 검색" color="blue" />
        </Link>
      </Wrapper.SECTION>

      <Wrapper.SECTION>
        <Text.HEADING text="실시간 상위 종목" />
        <PopularStock />
      </Wrapper.SECTION>
    </Wrapper.MAIN>
  );
}
