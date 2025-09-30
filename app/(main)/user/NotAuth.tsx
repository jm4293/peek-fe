import Link from 'next/link';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

export default function NotAuth() {
  return (
    <Wrapper.SECTION text="로그인 후 이용 가능합니다">
      <Link href="/auth/login">
        <Text.PARAGRAPH text="로그인 하러가기" />
      </Link>
    </Wrapper.SECTION>
  );
}
