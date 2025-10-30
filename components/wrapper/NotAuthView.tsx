import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

interface IProps {
  text: string;
}

export function NotAuthView(props: IProps) {
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
        <Link href="/notice" className="flex items-center justify-between">
          <Text.HEADING text="공지사항" />
          <ChevronRight />
        </Link>
      </Wrapper.SECTION>
    </Wrapper.MAIN>
  );
}
