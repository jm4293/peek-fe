'use client';

import { useAuthMutation, useMyInfoQuery } from '@/hooks';
import Text from '@/components/text/text';
import Skeleton from '@/components/skeleton/skeleton';
import Thumbnail from '@/components/image/thumbnail';
import Wrapper from '@/components/wrapper/wrapper';

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
        <div className="flex items-center gap-4">
          <Thumbnail src={data.thumbnail} onClick />

          <div>
            <Text value={data.nickname} color="#000000" />
            <Text value={data.email} color="#000000" />
          </div>
        </div>
      </Wrapper>

      <Wrapper title="게시판">
        <div className="flex flex-col gap-4">
          <Text value="작성한 게시글" color="#000000" onClick={() => {}} />
          <Text value="작성한 댓글" color="#000000" onClick={() => {}} />
        </div>
      </Wrapper>

      <Wrapper>
        <Text value="로그아웃" color="#000000" size="lg" onClick={clickHandler} />
      </Wrapper>
    </div>
  );
}
