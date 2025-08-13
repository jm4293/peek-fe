import BoardModify from '@/app/(main)/board/[id]/modify/BoardModify';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { boardDetailAction } from '@/services/board';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function BoardModifyPage(props: IProps) {
  const { id } = await props.params;

  const { data, success } = await boardDetailAction(id);

  if (!data) {
    return (
      <Wrapper>
        <Text.HEADING text="게시판 불러오는데 실패했습니다." />
      </Wrapper>
    );
  }

  return <BoardModify board={data} id={id} />;
}
