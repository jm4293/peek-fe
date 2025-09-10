import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { myAction } from '@/services/user';

import UserLogout from './Logout';
import NotAuth from './NotAuth';
import User from './User';

export default async function UserPage() {
  const { data: my } = await myAction();

  if (!my) {
    return (
      <Wrapper.MAIN text="마이페이지">
        <NotAuth />
      </Wrapper.MAIN>
    );
  }

  return (
    <Wrapper.MAIN text="마이페이지">
      <div className="flex flex-col gap-2">
        <User my={my} />

        <Wrapper.SECTION text="기록">
          <div className="flex flex-col gap-4">
            <Link href="" className="flex items-center justify-between">
              <Text.HEADING text="즐겨찾기 종목" />
              <ChevronRight />
            </Link>
          </div>
        </Wrapper.SECTION>

        <Wrapper.SECTION text="커뮤니티">
          <div className="flex flex-col gap-4">
            <Link href="/user/board" className="flex items-center justify-between">
              <Text.HEADING text="작성한 커뮤니티 게시글" />
              <ChevronRight />
            </Link>
            <Link href="/user/board/comment" className="flex items-center justify-between">
              <Text.HEADING text="작성한 커뮤니티 게시글 댓글" />
              <ChevronRight />
            </Link>
          </div>
        </Wrapper.SECTION>

        <UserLogout />
      </div>
    </Wrapper.MAIN>
  );
}
