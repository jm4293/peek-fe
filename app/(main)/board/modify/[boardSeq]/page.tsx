import { GetBoardDetail } from '@/app/(main)/board/detail/[boardSeq]/action';
import BoardModify from '@/app/(main)/board/modify/[boardSeq]/_components/boardModify';

import { IBoardDetailRes } from '@/types/res';

interface IProps {
  params: Promise<{ boardSeq: string }>;
}

export default async function Page({ params }: IProps) {
  const { boardSeq } = await params;

  const boardDetail: IBoardDetailRes = await GetBoardDetail(Number(boardSeq));

  return (
    <>
      <BoardModify board={boardDetail.board} />
    </>
  );
}
