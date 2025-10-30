import { Text } from '@/components/text';
import { InternalErrorView, NotAuthView, Wrapper } from '@/components/wrapper';

import { stockCategoryListAction } from '@/services/stock';
import { userInfoAction } from '@/services/user';

import BoardRegister from './BoardRegister';

export default async function BoardRegisterPage() {
  const { success: userInfoSuccess, data: userInfo } = await userInfoAction();
  const { success: stockCategorySuccess, data: stockCategoryList } = await stockCategoryListAction();

  if (!userInfo) {
    return <NotAuthView text="게시글 등록" />;
  }

  if (!stockCategorySuccess) {
    return (
      <Wrapper.MAIN text="게시글 등록">
        <InternalErrorView />
      </Wrapper.MAIN>
    );
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
    <Wrapper.MAIN text="게시글 등록">
      <BoardRegister stockCategoryList={stockCategoryList} />
    </Wrapper.MAIN>
  );
}
