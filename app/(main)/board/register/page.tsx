import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { stockCategoryListAction } from '@/services/stock';

import BoardRegister from './BoardRegister';

export default async function BoardRegisterPage() {
  const { data } = await stockCategoryListAction();

  if (!data) {
    return (
      <Wrapper>
        <Text.HEADING text="게시판 카테고리 목록을 불러오는데 실패했습니다." />
      </Wrapper>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Text.SUBTITLE text="게시글 등록" />
      <BoardRegister stockCategoryList={data} />
    </div>
  );
}
