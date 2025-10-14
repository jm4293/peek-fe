import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

export default function NotAuth() {
  return (
    <Wrapper.MAIN text="마이페이지">
      <Wrapper.SECTION text="로그인 후 이용 가능합니다">
        <Link href="/auth/login" className="flex items-center justify-between">
          <Text.HEADING text="로그인" />
          <ChevronRight />
        </Link>
      </Wrapper.SECTION>
      <Wrapper.SECTION text="알림">
        <Link href="/notice" className="flex items-center justify-between">
          <Text.HEADING text="공지사항" />
          <ChevronRight />
        </Link>
      </Wrapper.SECTION>
    </Wrapper.MAIN>
  );
}
