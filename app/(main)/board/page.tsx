import { NetworkErrorText, Text } from '@/components/text';
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

  if (!data) {
    return (
      <Wrapper.MAIN text="커뮤니티">
        <Wrapper.SECTION>
          <Text.CAPTION text="카테고리를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요." color="red" />
        </Wrapper.SECTION>
      </Wrapper.MAIN>
    );
  }

  return (
    <Wrapper.MAIN text="커뮤니티">
      <BoardCategory stockCategoryList={data} />
      <BoardRegisterButton isAuth={isAuth} />
      <BoardList />
    </Wrapper.MAIN>
  );
}
