import BoardModify from '@/app/(main)/board/[boardId]/modify/BoardModify';

interface IProps {
  params: Promise<{ boardId: string }>;
}

export default async function BoardModifyPage({ params }: IProps) {
  const { boardId } = await params;

  return <BoardModify boardId={boardId} />;
}
