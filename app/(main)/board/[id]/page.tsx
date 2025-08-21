import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { boardDetailAction } from '@/services/board';
import { myAction } from '@/services/user';

import BoardComment from './BoardComment';
import BoardDetail from './BoardDetail';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function BoardDetailPage(props: IProps) {
  const { id } = await props.params;

  const { data: my } = await myAction();

  const { data, success } = await boardDetailAction(id);

  if (!success || !data) {
    return (
      <Wrapper>
        <Text.HEADING text="게시판 불러오는데 실패했습니다." />
      </Wrapper>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Text.SUBTITLE text="게시글" />

      <div className="flex flex-col gap-2">
        <BoardDetail board={data} my={my} />
        <BoardComment id={id} my={my} />
      </div>
    </div>
  );
}
