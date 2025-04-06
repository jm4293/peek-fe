'use client';

import { useAuthMutation, useMyInfoQuery } from '@/hooks';
import Text from '@/components/text/text';
import Skeleton from '@/components/skeleton/skeleton';
import Thumbnail from '@/components/image/thumbnail';
import Wrapper from '@/components/wrapper/wrapper';

import { SlArrowRight } from 'react-icons/sl';

export default function UserInfo() {
  const { data, isSuccess } = useMyInfoQuery();

  const { logoutMutation } = useAuthMutation();

  const clickHandler = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      logoutMutation.mutate();
    }
  };

  if (!isSuccess) {
    return <Skeleton />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Wrapper>
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-4">
            <Thumbnail src={data.thumbnail} onClick />

            <div>
              <Text value={data.nickname} />
              <Text value={data.email} />
            </div>
          </div>

          <SlArrowRight />
        </div>
      </Wrapper>

      <Wrapper title="게시판">
        <div className="flex flex-col gap-4">
          <Text value="작성한 게시글" onClick={() => {}} />
          <Text value="작성한 댓글" onClick={() => {}} />
        </div>
      </Wrapper>

      <Wrapper>
        <Text value="로그아웃" size="lg" onClick={clickHandler} color="red" />
      </Wrapper>
    </div>
  );
}
