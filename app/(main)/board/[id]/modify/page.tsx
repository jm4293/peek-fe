import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { boardDetailAction } from '@/services/board';

import BoardModify from './BoardModify';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function BoardModifyPage(props: IProps) {
  const { id } = await props.params;

  const { data } = await boardDetailAction(id);

  if (!data) {
    return (
      <Wrapper.SECTION>
        <Text.HEADING text="게시판 불러오는데 실패했습니다." />
      </Wrapper.SECTION>
    );
  }

  return (
    <Wrapper.MAIN text="Board">
      <BoardModify board={data} id={id} />
    </Wrapper.MAIN>
  );
}
