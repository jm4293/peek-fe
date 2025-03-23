import BoardComment from '@/app/(main)/board/_components/boardComment';
import BoardDetail from '@/app/(main)/board/_components/boardDetail';

export default async function Page({ params }: { params: { boardSeq: string } }) {
  const { boardSeq } = params;

  return (
    <>
      <BoardDetail boardSeq={boardSeq} isAuth={false} />
      <BoardComment boardSeq={boardSeq} isAuth={false} />
    </>
  );
}
