import BoardModify from '@/app/(main)/board/[boardId]/modify/BoardModify';

interface IProps {
  params: { boardId: string };
}

export default function Page({ params }: IProps) {
  const { boardId } = params;

  return <BoardModify boardId={boardId} />;
}
