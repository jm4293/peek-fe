import { Bell, ChevronRight, Palette, Shield } from 'lucide-react';
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
          <div className="flex items-center gap-3">
            <Text.HEADING text="로그인 하러 가기" />
          </div>
          <ChevronRight />
        </Link>
      </Wrapper.SECTION>

      <Wrapper.SECTION text="설정">
        <Link href="/user/setting/theme" className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Palette size={20} />
            <Text.HEADING text="테마 설정" />
          </div>
          <ChevronRight />
        </Link>
      </Wrapper.SECTION>

      <Wrapper.SECTION text="고객센터">
        <Link href="/user/notice" className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell size={20} />
            <Text.HEADING text="공지사항" />
          </div>
          <ChevronRight />
        </Link>
        <Link href="/privacy" className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield size={20} />
            <Text.HEADING text="개인정보 처리방침" />
          </div>
          <ChevronRight />
        </Link>
      </Wrapper.SECTION>
    </Wrapper.MAIN>
  );
}
