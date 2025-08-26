import Link from 'next/link';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

import { Thumbnail } from '@/components/image';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { IUserAccountModel } from '@/services/user';

import { userAccountTypeDescription } from '@/shared/enum/user';

import UserLogout from './Logout';

interface IProps {
  my: IUserAccountModel;
}

export default function User(props: IProps) {
  const { my } = props;

  return (
    <div className="flex flex-col gap-2">
      <Wrapper.SECTION>
        <Link href="/user/detail" className="py-1 flex items-center justify-between">
          <div className="w-full flex items-center gap-2">
            <Thumbnail thumbnail={my.user.thumbnail} w={40} />
            <div>
              <Text.HEADING text={my.user.nickname} />
              <div className="flex items-center gap-2">
                <Text.PARAGRAPH text={userAccountTypeDescription[my.userAccountType]} />
                <span>|</span>
                <Text.PARAGRAPH text={my.email} />
              </div>
            </div>
          </div>
          <MdOutlineArrowForwardIos />
        </Link>
      </Wrapper.SECTION>

      <Wrapper.SECTION text="최근 기록">
        <div className="flex flex-col gap-4">
          <Link href="" className="flex items-center justify-between">
            <Text.HEADING text="검색 종목" />
            <MdOutlineArrowForwardIos />
          </Link>
          <Link href="" className="flex items-center justify-between">
            <Text.HEADING text="즐겨찾기 종목" />
            <MdOutlineArrowForwardIos />
          </Link>
        </div>
      </Wrapper.SECTION>

      <Wrapper.SECTION text="게시판">
        <div className="flex flex-col gap-4">
          <Link href="/user/board" className="flex items-center justify-between">
            <Text.HEADING text="작성한 게시글" />
            <MdOutlineArrowForwardIos />
          </Link>
          <Link href="/user/board/comment" className="flex items-center justify-between">
            <Text.HEADING text="작성한 게시글 댓글" />
            <MdOutlineArrowForwardIos />
          </Link>
        </div>
      </Wrapper.SECTION>

      <UserLogout />
    </div>
  );
}
