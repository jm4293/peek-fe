'use client';

import { Wrapper } from '@/components/wrapper';

import KosdaqIndex from './KosdaqIndex';

export default function KosdaqIndexPage() {
  return (
    <Wrapper.MAIN text="코스닥 상세">
      <KosdaqIndex />
    </Wrapper.MAIN>
  );
}
