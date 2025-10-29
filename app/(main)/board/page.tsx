import { Text } from '@/components/text';
import { InternalErrorView, Wrapper } from '@/components/wrapper';

import { stockCategoryListAction } from '@/services/stock';
import { userInfoAction } from '@/services/user';

import BoardCategory from './BoardCategory';
import BoardList from './BoardList';
import { BoardRegisterButton } from './BoardRegisterButton';

export default async function BoardPage() {
  const { success: userInfoSuccess, data: userInfo } = await userInfoAction();
  const { success: stockCategorySuccess, data: stockCategoryList } = await stockCategoryListAction();

  if (!userInfoSuccess || !stockCategorySuccess) {
    return <InternalErrorView text="커뮤니티" />;
  }

  if (!stockCategoryList) {
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
      <BoardCategory stockCategoryList={stockCategoryList} />
      <BoardList />
      <BoardRegisterButton userInfo={userInfo} />
    </Wrapper.MAIN>
  );
}
