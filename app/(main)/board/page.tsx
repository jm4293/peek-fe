import { parseCookie } from '@/utils';
import { headers } from 'next/headers';

import { BoardRegisterSvg } from '@/asset/svg';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { stockCategoryListAction } from '@/services/stock';

import { REFRESH_TOKEN_NAME } from '@/shared/constant/cookie';

import BoardCategory from './BoardCategory';
import BoardList from './BoardList';

export default async function BoardPage() {
  const headerList = await headers();
  const cookie = headerList.get('cookie');

  const isAuth = parseCookie.set(cookie).pick(REFRESH_TOKEN_NAME);

  const { success, data } = await stockCategoryListAction();

  if (!success) {
    return (
      <Wrapper>
        <Text.HEADING text="게시판 카테고리 목록을 불러오는데 실패했습니다." />
      </Wrapper>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Text.SUBTITLE text="게시판" />

      <div className="flex flex-col gap-4">
        <BoardCategory stockCategoryList={data!.stockCategoryList} />
        <BoardList />
      </div>

      {isAuth && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <BoardRegisterSvg />
        </div>
      )}
    </div>
  );
}
