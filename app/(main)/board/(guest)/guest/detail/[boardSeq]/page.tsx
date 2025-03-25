import BoardComment from '@/app/(main)/board/_components/boardComment';
import BoardDetail from '@/app/(main)/board/_components/boardDetail';

interface IProps {
  params: Promise<{ boardSeq: string }>;
}

export default async function Page({ params }: IProps) {
  const { boardSeq } = await params;

  return (
    <>
      <BoardDetail boardSeq={boardSeq} isAuth={false} />
      <BoardComment boardSeq={boardSeq} isAuth={false} />
    </>
  );
}
