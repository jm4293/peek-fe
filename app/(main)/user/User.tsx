import Link from 'next/link';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

import { Thumbnail } from '@/components/image';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { IUserAccountModel } from '@/services/user';

import UserLogout from './Logout';

interface IProps {
  my: IUserAccountModel;
}

export default function User(props: IProps) {
  const { my } = props;

  return (
    <div className="flex flex-col gap-2">
      <Wrapper>
        <Link href="/user/detail" className="py-1 flex items-center justify-between">
          <div className="w-full flex items-center gap-4">
            <Thumbnail thumbnail={my.user.thumbnail} />
            <div>
              <Text.HEADING text={my.user.nickname} />
              <Text.PARAGRAPH text={my.email} />
            </div>
          </div>
          <MdOutlineArrowForwardIos />
        </Link>
      </Wrapper>

      <Wrapper title="최근 기록">
        <Link href="" className="flex items-center justify-between">
          <Text.PARAGRAPH text="검색 종목" />
          <MdOutlineArrowForwardIos />
        </Link>

        <Link href="" className="flex items-center justify-between">
          <Text.PARAGRAPH text="즐겨찾기 종목" />
          <MdOutlineArrowForwardIos />
        </Link>
      </Wrapper>

      <Wrapper title="게시판">
        <Link href="/user/board" className="flex items-center justify-between">
          <Text.PARAGRAPH text="작성한 게시글" />
          <MdOutlineArrowForwardIos />
        </Link>
        <Link href="/user/board/comment" className="flex items-center justify-between">
          <Text.PARAGRAPH text="작성한 게시글 댓글" />
          <MdOutlineArrowForwardIos />
        </Link>
      </Wrapper>

      <UserLogout />
    </div>
  );
}
