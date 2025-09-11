import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { stockCategoryListAction } from '@/services/stock';
import { myAction } from '@/services/user';

import BoardCategory from './BoardCategory';
import BoardList from './BoardList';
import { BoardRegisterButton } from './BoardRegisterButton';

export default async function BoardPage() {
  const { success: isAuth } = await myAction();
  const { data } = await stockCategoryListAction();

  if (!data) {
    return (
      <Wrapper.MAIN text="커뮤니티">
        <Wrapper.SECTION>
          <Text.HEADING text="주식 카테고리 목록을 불러오는데 실패했습니다." />
        </Wrapper.SECTION>
      </Wrapper.MAIN>
    );
  }

  return (
    <Wrapper.MAIN text="커뮤니티">
      <BoardCategory stockCategoryList={data} />
      <BoardList />

      <BoardRegisterButton isAuth={isAuth} />
    </Wrapper.MAIN>
  );
}
