import BoardDetail from '@/app/(main)/board/_components/boardDetail';
import BoardComment from '@/app/(main)/board/_components/boardComment';

interface IProps {
  params: Promise<{ boardSeq: string }>;
}

export default async function Page({ params }: IProps) {
  const { boardSeq } = await params;

  return (
    <div className="flex flex-col gap-2">
      <BoardDetail boardSeq={boardSeq} isAuth={true} />
      <BoardComment boardSeq={boardSeq} isAuth={true} />
    </div>
  );
}
