import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { stockCategoryListAction } from '@/services/stock';

import BoardRegister from './BoardRegister';

export default async function BoardRegisterPage() {
  const { data } = await stockCategoryListAction();

  if (!data) {
    return (
      <Wrapper.SECTION>
        <Text.HEADING text="게시판 카테고리 목록을 불러오는데 실패했습니다." />
      </Wrapper.SECTION>
    );
  }

  return (
    <Wrapper.MAIN text="Board">
      <BoardRegister stockCategoryList={data} />
    </Wrapper.MAIN>
  );
}
