import { EmptyDataView, InternalErrorView, Wrapper } from '@/components/wrapper';

import { boardDetailAction } from '@/services/board';
import { userInfoAction } from '@/services/user';

import BoardComment from './BoardComment';
import BoardCommentRegister from './BoardCommentRegister';
import BoardDetail from './BoardDetail';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function BoardDetailPage(props: IProps) {
  const { id } = await props.params;

  const { data: userInfo } = await userInfoAction();
  const { success, data } = await boardDetailAction(id);

  if (!success) {
    return (
      <Wrapper.MAIN text="게시글">
        <InternalErrorView />
      </Wrapper.MAIN>
    );
  }

  if (!data) {
    return (
      <Wrapper.MAIN text="게시글">
        <EmptyDataView text="게시글" />
      </Wrapper.MAIN>
    );
  }

  return (
    <Wrapper.MAIN text="게시글">
      <BoardDetail board={data} userInfo={userInfo} />
      <BoardComment id={id} userInfo={userInfo} />
      <BoardCommentRegister id={id} userInfo={userInfo} />
    </Wrapper.MAIN>
  );
}
