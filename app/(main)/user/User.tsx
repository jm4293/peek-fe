'use client';

import { MdOutlineArrowForwardIos } from 'react-icons/md';

import { Thumbnail } from '@/components/image';
import { LineSkeleton } from '@/components/skeleton';
import { EditableText } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useAuthMutation } from '@/services/auth';
import { useMyInfo } from '@/services/user';

export default function User() {
  const { data, isSuccess } = useMyInfo();

  const { logoutMutation } = useAuthMutation();

  const logoutHandler = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      logoutMutation.mutate();
    }
  };

  if (!isSuccess) {
    return (
      <div className="flex flex-col gap-4">
        <LineSkeleton height={2} />
        <LineSkeleton height={2} />
        <LineSkeleton height={2} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Wrapper>
        <div className="flex items-center justify-between cursor-pointer">
          <div className="w-full flex items-center gap-4">
            <Thumbnail />

            <div>
              <EditableText.PARAGRAPH text={data.user.nickname} />
              <EditableText.PARAGRAPH text={data.email} />
            </div>
          </div>

          <MdOutlineArrowForwardIos />
        </div>
      </Wrapper>

      <div className="flex flex-col gap-2">
        <Wrapper title="최근 기록">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between cursor-pointer">
              <EditableText.PARAGRAPH text="검색 종목" />
              <MdOutlineArrowForwardIos />
            </div>

            <div className="flex items-center justify-between cursor-pointer">
              <EditableText.PARAGRAPH text="즐겨찾기 종목" />
              <MdOutlineArrowForwardIos />
            </div>
          </div>
        </Wrapper>

        <Wrapper title="게시판">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between cursor-pointer">
              <EditableText.PARAGRAPH text="작성한 게시글" />
              <MdOutlineArrowForwardIos />
            </div>

            <div className="flex items-center justify-between cursor-pointer">
              <EditableText.PARAGRAPH text="작성한 게시글 댓글" />
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
