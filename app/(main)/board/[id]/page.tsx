import { parseCookie } from '@/utils';
import { headers } from 'next/headers';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { boardDetailAction } from '@/services/board';

import { REFRESH_TOKEN_NAME } from '@/shared/constant/cookie';

import BoardComment from './BoardComment';
import BoardDetail from './BoardDetail';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function BoardDetailPage(props: IProps) {
  const { id } = await props.params;

  const headerList = await headers();
  const cookie = headerList.get('cookie');

  const isAuth = parseCookie.set(cookie).pick(REFRESH_TOKEN_NAME);

  const { data, success } = await boardDetailAction(id);

  if (!success) {
    return (
      <Wrapper>
        <Text.HEADING text="게시판 불러오는데 실패했습니다." />
      </Wrapper>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <BoardDetail board={data!.board} id={id} isAuth={isAuth} />
      <BoardComment id={id} isAuth={isAuth} />
    </div>
  );
}
