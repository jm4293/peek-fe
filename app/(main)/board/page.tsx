import { EmptyDataView, InternalErrorView, Wrapper } from '@/components/wrapper';

import { stockCategoryListAction } from '@/services/stock';
import { userInfoAction } from '@/services/user';

import BoardCategory from './BoardCategory';
import BoardList from './BoardList';
import { BoardRegisterButton } from './BoardRegisterButton';

export default async function BoardPage() {
  const { data: userInfo } = await userInfoAction();
  const { success: stockCategorySuccess, data: stockCategoryList } = await stockCategoryListAction();

  if (!stockCategorySuccess) {
    return (
      <Wrapper.MAIN text="커뮤니티">
        <InternalErrorView />
      </Wrapper.MAIN>
    );
  }

  if (!stockCategoryList) {
    return (
      <Wrapper.MAIN text="커뮤니티">
        <EmptyDataView text="카테고리" />
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
