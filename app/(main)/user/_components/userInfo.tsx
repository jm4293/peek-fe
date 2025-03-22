'use client';

import { useAuthMutation, useMyInfoQuery } from '@/hooks';
import { ImageTypeEnum } from '@/constant/enum';
import Image from '@/components/image/image';
import Text from '@/components/text/text';
import Loading from '@/components/loading/loading';

export default function UserInfo() {
  const myInfoQuery = useMyInfoQuery();

  const { logoutMutation } = useAuthMutation();

  const onClickLogoutHandler = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      logoutMutation.mutate();
    }
  };

  return myInfoQuery.isSuccess ? (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-4">
        <div>
          <Image src={myInfoQuery.data.thumbnail} alt="profile" type={ImageTypeEnum.THUMBNAIL} />
        </div>
        <div>
          <Text value={myInfoQuery.data.nickname} color="#000000" />
          <Text value={myInfoQuery.data.email} color="#000000" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Text value="게시판" color="#000000" size="lg" />
        <div className="flex flex-col gap-2">
          <Text value="작성한 게시글" color="#000000" onClick={() => {}} />
          <Text value="작성한 댓글" color="#000000" onClick={() => {}} />
        </div>
      </div>

      <div>
        <Text value="로그아웃" color="#000000" size="lg" onClick={onClickLogoutHandler} />
      </div>
    </div>
  ) : (
    <Loading />
  );
}
