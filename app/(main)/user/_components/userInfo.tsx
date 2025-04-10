'use client';

import { useAuthMutation, useMyInfoQuery } from '@/hooks';
import Text from '@/components/text/text';
import Thumbnail from '@/components/image/thumbnail';
import Wrapper from '@/components/wrapper/wrapper';

import { MdOutlineArrowForwardIos } from 'react-icons/md';
import LineSkeleton from '@/components/skeleton/lineSkeleton';

export default function UserInfo() {
  const { data, isSuccess } = useMyInfoQuery();

  const { logoutMutation } = useAuthMutation();

  const clickHandler = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      logoutMutation.mutate();
    }
  };

  if (!isSuccess) {
    return (
      <div className="flex flex-col gap-4">
        <LineSkeleton height={1} />
        <LineSkeleton height={1} />
        <LineSkeleton height={1} />
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-4">
      <Wrapper>
        <div className="flex items-center justify-between cursor-pointer">
          <div className="w-full flex items-center gap-4">
            <Thumbnail onClick />

            <div>
              <Text value={data.nickname} />
              <Text value={data.email} />
            </div>
          </div>

          <MdOutlineArrowForwardIos />
        </div>
      </Wrapper>

      <div className="flex flex-col gap-2">
        <Wrapper title="최근 기록">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between cursor-pointer">
              <Text value="검색 종목" onClick={() => {}} />
              <MdOutlineArrowForwardIos />
            </div>

            <div className="flex items-center justify-between cursor-pointer">
              <Text value="즐겨찾기 종목" onClick={() => {}} />
              <MdOutlineArrowForwardIos />
            </div>
          </div>
        </Wrapper>

        <Wrapper title="게시판">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between cursor-pointer">
              <Text value="작성한 게시글" onClick={() => {}} />
              <MdOutlineArrowForwardIos />
            </div>

            <div className="flex items-center justify-between cursor-pointer">
              <Text value="작성한 댓글" onClick={() => {}} />
              <MdOutlineArrowForwardIos />
            </div>
          </div>
        </Wrapper>

        <Wrapper>
          <Text value="로그아웃" size="lg" onClick={clickHandler} color="red" />
        </Wrapper>
      </div>
    </main>
  );
}
