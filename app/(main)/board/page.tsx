import Link from 'next/link';

import { BoardRegisterSvg } from '@/asset/svg';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { stockCategoryListAction } from '@/services/stock';
import { myAction } from '@/services/user';

import BoardCategory from './BoardCategory';
import BoardList from './BoardList';

export default async function BoardPage() {
  const { success: isAuth } = await myAction();
  const { data } = await stockCategoryListAction();

  if (!data) {
    return (
      <Wrapper.MAIN text="게시판">
        <Wrapper.SECTION>
          <Text.HEADING text="게시판 카테고리 목록을 불러오는데 실패했습니다." />
        </Wrapper.SECTION>
      </Wrapper.MAIN>
    );
  }

  return (
    <Wrapper.MAIN text="게시판">
      <div className="flex flex-col gap-2">
        <BoardCategory stockCategoryList={data} />
        <BoardList />
      </div>

      {isAuth && (
        <Link href="/board/register" className="fixed bottom-0 right-0 -translate-x-1/2 -translate-y-1/2">
          <BoardRegisterSvg />
        </Link>
      )}
    </Wrapper.MAIN>
  );
}
