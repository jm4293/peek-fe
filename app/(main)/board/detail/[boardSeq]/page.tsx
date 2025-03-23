import BoardDetail from '@/app/(main)/board/_components/boardDetail';
import BoardComment from '@/app/(main)/board/_components/boardComment';

export default async function Page({ params }: { params: { boardSeq: string } }) {
  const { boardSeq } = params;

  return (
    <>
      <BoardDetail boardSeq={boardSeq} isAuth={true} />
      <BoardComment boardSeq={boardSeq} isAuth={true} />
    </>
  );
}
