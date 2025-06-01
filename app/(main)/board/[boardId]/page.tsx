import { isAuth } from '@/app/(main)/_components';
import BoardComment from '@/app/(main)/board/[boardId]/_components/boardComment';
import BoardDetail from '@/app/(main)/board/[boardId]/_components/boardDetail';

interface IProps {
  params: Promise<{ boardId: string }>;
}

export default async function Page(props: IProps) {
  const { boardId } = await props.params;

  const auth = await isAuth();

  return (
    <div className="flex flex-col gap-2">
      <BoardDetail boardId={boardId} auth={auth} />
      {/*<BoardComment boardSeq={boardSeq} isAuth={true} />*/}
    </div>
  );
}
