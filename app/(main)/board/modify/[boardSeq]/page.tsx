import Form from '@/app/(main)/board/modify/[boardSeq]/_components/form';
import { IBoardDetailRes } from '@/types/res';
import { GetBoardDetail } from '@/app/(main)/board/list/action';

interface IProps {
  params: Promise<{ boardSeq: string }>;
}

export default async function Page({ params }: IProps) {
  const { boardSeq } = await params;

  const boardDetail: IBoardDetailRes = await GetBoardDetail(Number(boardSeq));

  const { board } = boardDetail;

  return (
    <>
      <Form board={board} />
    </>
  );
}
