import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

interface Props {
  text: string;
}

export function NotAuthView(props: Props) {
  const { text } = props;

  return (
    <Wrapper.MAIN text={text}>
      <Wrapper.SECTION text="로그인이 필요합니다.">
        <Link href="/auth/login" className="flex items-center justify-between">
          <Text.HEADING text="로그인 하러 가기" />
          <ChevronRight />
        </Link>
      </Wrapper.SECTION>

      <Wrapper.SECTION text="알림">
        <Link href="/user/notice" className="flex items-center justify-between">
          <Text.HEADING text="공지사항" />
          <ChevronRight />
        </Link>
      </Wrapper.SECTION>

      <Wrapper.SECTION text="설정">
        <Link href="/user/setting/theme" className="flex items-center justify-between">
          <Text.HEADING text="테마 설정" />
          <ChevronRight />
        </Link>
      </Wrapper.SECTION>
    </Wrapper.MAIN>
  );
}
