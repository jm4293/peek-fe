import { Bell, ChevronRight, FileText, HelpCircle, MessageSquare, Palette, Star } from 'lucide-react';
import Link from 'next/link';

import { Thumbnail } from '@/components/image';
import { Text } from '@/components/text';
import { InternalErrorView, NotAuthView, Wrapper } from '@/components/wrapper';

import { getUserInfo } from '@/services/user';

import { ERROR_CODE } from '@/shared/constant/error-code/error-code';

import UserLogout from './Logout';

export default async function UserPage() {
  const { success, data, code } = await getUserInfo();

  if (!success && code === ERROR_CODE.UNAUTHORIZED) {
    return <NotAuthView text="내 정보" />;
  }

  if (!data) {
    return (
      <Wrapper.MAIN text="내 정보">
        <InternalErrorView />
      </Wrapper.MAIN>
    );
  }

  return (
    <Wrapper.MAIN text="내 정보">
      <Wrapper.SECTION>
        <Link href="/user/detail" className="w-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Thumbnail thumbnail={data.user.thumbnail} size={36} />
            <Text.HEADING text={data.user.nickname} />
          </div>
          <ChevronRight />
        </Link>
      </Wrapper.SECTION>

      <Wrapper.SECTION text="히스토리">
        <Link href="/user/stock/favorite" className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Star size={20} />
            <Text.HEADING text="즐겨찾기 종목" />
          </div>
          <ChevronRight />
        </Link>
        <Link href="/user/board" className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText size={20} />
            <Text.HEADING text="작성한 커뮤니티 게시글" />
          </div>
          <ChevronRight />
        </Link>
        <Link href="/user/board/comment" className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare size={20} />
            <Text.HEADING text="작성한 커뮤니티 게시글 댓글" />
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
        <Link href="/user/inquiry" className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HelpCircle size={20} />
            <Text.HEADING text="문의하기" />
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

      <UserLogout />
    </Wrapper.MAIN>
  );
}
