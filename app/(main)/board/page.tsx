import { NetworkErrorText } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { stockCategoryListAction } from '@/services/stock';
import { myAccountAction } from '@/services/user';

import BoardCategory from './BoardCategory';
import BoardList from './BoardList';
import { BoardRegisterButton } from './BoardRegisterButton';

export default async function BoardPage() {
  const { success: isAuth } = await myAccountAction();
  const { data, success } = await stockCategoryListAction();

  if (!success) {
    return (
      <Wrapper.MAIN text="커뮤니티">
        <Wrapper.SECTION>
          <NetworkErrorText />
        </Wrapper.SECTION>
      </Wrapper.MAIN>
    );
  }

  return (
    <Wrapper.MAIN text="커뮤니티">
      {data && <BoardCategory stockCategoryList={data} />}
      <BoardList />

      <BoardRegisterButton isAuth={isAuth} />
    </Wrapper.MAIN>
  );
}
