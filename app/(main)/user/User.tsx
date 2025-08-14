'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

import { HumanSvg } from '@/asset/svg';

import { EditableText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useAuthMutation } from '@/services/auth';
import { IUserAccountModel } from '@/services/user';

interface IProps {
  my: IUserAccountModel;
}

export default function User(props: IProps) {
  const { my } = props;
  const router = useRouter();

  const { logoutMutation } = useAuthMutation();

  const clickHandler = () => {
    router.push('/auth/login');
  };

  const logoutHandler = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      logoutMutation.mutate();
    }
  };

  if (!my) {
    return (
      <Wrapper title="로그인이 필요합니다">
        <EditableText.HEADING text="로그인 하러가기" onClick={clickHandler} />
      </Wrapper>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Wrapper>
        <div className="flex items-center justify-between cursor-pointer">
          <div className="w-full flex items-center gap-4">
            {my.user.thumbnail ? (
              <Image src={my.user.thumbnail} alt="thumbnail" width={80} height={80} />
            ) : (
              <HumanSvg />
            )}

            <div>
              <Text.PARAGRAPH text={my.user.nickname} />
              <Text.PARAGRAPH text={my.email} />
            </div>
          </div>

          <MdOutlineArrowForwardIos />
        </div>
      </Wrapper>

      <div className="flex flex-col gap-2">
        <Wrapper title="최근 기록">
          <div className="flex flex-col gap-2">
            <div className="py-1 flex items-center justify-between cursor-pointer">
              <Text.PARAGRAPH text="검색 종목" />
              <MdOutlineArrowForwardIos />
            </div>

            <div className="py-1 flex items-center justify-between cursor-pointer">
              <Text.PARAGRAPH text="즐겨찾기 종목" />
              <MdOutlineArrowForwardIos />
            </div>
          </div>
        </Wrapper>

        <Wrapper title="게시판">
          <div className="flex flex-col gap-2">
            <div
              className="py-1 flex items-center justify-between cursor-pointer"
              onClick={() => router.push('/user/board')}
            >
              <Text.PARAGRAPH text="작성한 게시글" />
              <MdOutlineArrowForwardIos />
            </div>

            <div
              className="py-1 flex items-center justify-between cursor-pointer"
              onClick={() => router.push('/user/board/comment')}
            >
              <Text.PARAGRAPH text="작성한 게시글 댓글" />
              <MdOutlineArrowForwardIos />
            </div>
          </div>
        </Wrapper>

        <Wrapper>
          <EditableText.HEADING text="로그아웃" color="red" onClick={logoutHandler} />
        </Wrapper>
      </div>
    </div>
  );
}
