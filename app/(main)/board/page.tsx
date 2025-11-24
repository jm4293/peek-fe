import { Wrapper } from '@/components/wrapper';

import { getUserInfo } from '@/services/user';

import BoardCategory from './BoardCategory';
import BoardList from './BoardList';
import { BoardRegisterButton } from './BoardRegisterButton';

export default async function BoardPage() {
  const { data: userInfo } = await getUserInfo();

  return (
    <Wrapper.MAIN text="커뮤니티">
      <div className="relative flex gap-4">
        <div className="sticky top-20 self-start">
          <BoardCategory />
        </div>
        <BoardList />
        <BoardRegisterButton userInfo={userInfo} />
      </div>
    </Wrapper.MAIN>
  );
}
