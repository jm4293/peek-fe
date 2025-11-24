import { Wrapper } from '@/components/wrapper';

import { getUserInfo } from '@/services/user';

import BoardCategory from './BoardCategory';
import BoardList from './BoardList';
import { BoardRegisterButton } from './BoardRegisterButton';

export default async function BoardPage() {
  const { data: userInfo } = await getUserInfo();

  return (
    <Wrapper.MAIN text="커뮤니티">
      <div className="relative grid grid-cols-4 gap-4">
        <div className="sticky top-20 self-start col-span-1">
          <BoardCategory />
        </div>
        <div className="col-span-3">
          <BoardList />
        </div>
        <BoardRegisterButton userInfo={userInfo} />
      </div>
    </Wrapper.MAIN>
  );
}
