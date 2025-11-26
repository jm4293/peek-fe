import { Suspense } from 'react';

import { SkeletonSuspense } from '@/components/skeleton';
import { Wrapper } from '@/components/wrapper';

import { getBoardDetail } from '@/services/board';
import { getUserInfo } from '@/services/user';

import BoardComment from './BoardComment';
import BoardCommentRegister from './BoardCommentRegister';
import BoardDetail from './BoardDetail';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BoardDetailPage(props: Props) {
  const { id } = await props.params;

  const { data: userInfo, success } = await getUserInfo();

  const board = getBoardDetail(id);

  return (
    <Wrapper.MAIN text="게시글">
      <Suspense fallback={<SkeletonSuspense />}>
        <BoardDetail board={board} userInfo={userInfo} />
      </Suspense>

      <BoardComment id={id} userInfo={userInfo} />
      <BoardCommentRegister id={id} userInfo={userInfo} />
    </Wrapper.MAIN>
  );
}
