import BoardComment from '@/app/(main)/board/_components/boardComment';
import BoardDetail from '@/app/(main)/board/_components/boardDetail';

interface IProps {
  params: Promise<{ boardSeq: string }>;
}

export default async function Page(props: IProps) {
  const { boardSeq } = await props.params;

  return (
    <div className="flex flex-col gap-2">
      <BoardDetail boardSeq={boardSeq} isAuth={true} />
      <BoardComment boardSeq={boardSeq} isAuth={true} />
    </div>
  );
}
