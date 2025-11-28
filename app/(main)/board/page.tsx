import { Wrapper } from '@/components/wrapper';

import { getUserInfo } from '@/services/user';

import BoardCategory from './BoardCategory';
import BoardList from './BoardList';
import BoardRegisterButton from './BoardRegisterButton';

export default async function BoardPage() {
  const { data: userInfo } = await getUserInfo();

  return (
    <Wrapper.MAIN text="커뮤니티">
      <div className="flex flex-col gap-4">
        <BoardCategory />
        <BoardList />
        <BoardRegisterButton userInfo={userInfo} />
      </div>
    </Wrapper.MAIN>
  );
}
