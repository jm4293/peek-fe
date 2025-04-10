import BoardComment from '@/app/(main)/board/_components/boardComment';
import BoardDetail from '@/app/(main)/board/_components/boardDetail';

interface IProps {
  params: Promise<{ boardSeq: string }>;
}

export default async function Page({ params }: IProps) {
  const { boardSeq } = await params;

  return (
    <div className="flex flex-col gap-2">
      <BoardDetail boardSeq={boardSeq} isAuth={false} />
      <BoardComment boardSeq={boardSeq} isAuth={false} />
    </div>
  );
}
