import { NotAuthView, Wrapper } from '@/components/wrapper';

import { getUserInfo } from '@/services/user';

import BoardRegister from './BoardRegister';

export default async function BoardRegisterPage() {
  const { data: userInfo } = await getUserInfo();

  if (!userInfo) {
    return <NotAuthView text="게시글 등록" />;
  }

  return (
    <Wrapper.MAIN text="게시글 등록">
      <BoardRegister />
    </Wrapper.MAIN>
  );
}
