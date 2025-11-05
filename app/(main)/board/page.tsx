import { Wrapper } from '@/components/wrapper';

import { getUserInfo } from '@/services/user';

import BoardCategory from './BoardCategory';
import BoardList from './BoardList';
import { BoardRegisterButton } from './BoardRegisterButton';

export default async function BoardPage() {
  const { data: userInfo } = await getUserInfo();

  return (
    <Wrapper.MAIN text="커뮤니티">
      <BoardCategory />
      <BoardList />
      <BoardRegisterButton userInfo={userInfo} />
    </Wrapper.MAIN>
  );
}
