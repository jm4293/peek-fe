import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { boardDetailAction } from '@/services/board';
import { myAccountAction } from '@/services/user';

import BoardComment from './BoardComment';
import BoardCommentRegister from './BoardCommentRegister';
import BoardDetail from './BoardDetail';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function BoardDetailPage(props: IProps) {
  const { id } = await props.params;

  const { data: myInfo } = await myAccountAction();
  const { data, success } = await boardDetailAction(id);

  if (!success) {
    return (
      <Wrapper.SECTION>
        <Text.HEADING text="게시글 불러오는데 실패했습니다." />
      </Wrapper.SECTION>
    );
  }

  if (!data) {
    return (
      <Wrapper.SECTION>
        <Text.HEADING text="존재하지 않는 게시글입니다." />
      </Wrapper.SECTION>
    );
  }

  return (
    <Wrapper.MAIN text="게시글">
      <BoardDetail board={data} myInfo={myInfo} />
      <BoardComment id={id} myInfo={myInfo} />
      <BoardCommentRegister id={id} myInfo={myInfo} />
    </Wrapper.MAIN>
  );
}
