import Form from '@/app/(main)/board/modify/[boardSeq]/_components/form';
import { IBoardDetailRes } from '@/types/res';
import { GetBoardDetail } from '@/app/(main)/board/action';

export default async function Page({ params }: { params: { boardSeq: string } }) {
  const { boardSeq } = params;

  const boardDetail: IBoardDetailRes = await GetBoardDetail(Number(boardSeq));

  const { board } = boardDetail;

  return (
    <>
      <Form board={board} />
    </>
  );
}
