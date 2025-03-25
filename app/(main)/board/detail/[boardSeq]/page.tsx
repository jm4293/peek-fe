import BoardDetail from '@/app/(main)/board/_components/boardDetail';
import BoardComment from '@/app/(main)/board/_components/boardComment';

interface IProps {
  params: Promise<{ boardSeq: string }>;
}

export default async function Page({ params }: IProps) {
  const { boardSeq } = await params;

  return (
    <>
      <BoardDetail boardSeq={boardSeq} isAuth={true} />
      <BoardComment boardSeq={boardSeq} isAuth={true} />
    </>
  );
}
