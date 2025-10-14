import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { myAccountAction } from '@/services/user';

import UserLogout from './Logout';
import NotAuth from './NotAuth';
import User from './User';

export default async function UserPage() {
  const { data: myInfo } = await myAccountAction();

  if (!myInfo) {
    return <NotAuth />;
  }

  return (
    <Wrapper.MAIN text="마이페이지">
      <User myInfo={myInfo} />

      <Wrapper.SECTION text="기록">
        <Link href="/user/stock/favorite" className="flex items-center justify-between">
          <Text.HEADING text="즐겨찾기 종목" />
          <ChevronRight />
        </Link>
      </Wrapper.SECTION>

      <Wrapper.SECTION text="커뮤니티">
        <Link href="/user/board" className="flex items-center justify-between">
          <Text.HEADING text="작성한 커뮤니티 게시글" />
          <ChevronRight />
        </Link>
        <Link href="/user/board/comment" className="flex items-center justify-between">
          <Text.HEADING text="작성한 커뮤니티 게시글 댓글" />
          <ChevronRight />
        </Link>
      </Wrapper.SECTION>

      <Wrapper.SECTION text="알림">
        <Link href="/notice" className="flex items-center justify-between">
          <Text.HEADING text="공지사항" />
          <ChevronRight />
        </Link>
        <Link href="/inquiry" className="flex items-center justify-between">
          <Text.HEADING text="문의하기" />
          <ChevronRight />
        </Link>
      </Wrapper.SECTION>

      <UserLogout />
    </Wrapper.MAIN>
  );
}
