import { EmptyDataView, InternalErrorView, Wrapper } from '@/components/wrapper';

import { getBoardDetail } from '@/services/board';

import BoardModify from './BoardModify';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BoardModifyPage(props: Props) {
  const { id } = await props.params;

  const { success, data } = await getBoardDetail(id);

  if (!success) {
    return (
      <Wrapper.MAIN text="게시글 수정">
        <InternalErrorView />
      </Wrapper.MAIN>
    );
  }

  if (!data) {
    return (
      <Wrapper.MAIN text="게시글 수정">
        <EmptyDataView text="게시글" />
      </Wrapper.MAIN>
    );
  }

  return (
    <Wrapper.MAIN text="게시글 수정">
      <BoardModify data={data} id={id} />
    </Wrapper.MAIN>
  );
}
