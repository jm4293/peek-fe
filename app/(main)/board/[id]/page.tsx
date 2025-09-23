import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { boardDetailAction } from '@/services/board';
import { myAction } from '@/services/user';

import BoardComment from './BoardComment';
import BoardDetail from './BoardDetail';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function BoardDetailPage(props: IProps) {
  const { id } = await props.params;

  const { data: my } = await myAction();

  const { data, success } = await boardDetailAction(id);

  if (!success) {
    return (
      <Wrapper.SECTION>
        <Text.HEADING text="게시글 불러오는데 실패했습니다." />
      </Wrapper.SECTION>
    );
  }

  if (!data) {
    return (
      <Wrapper.SECTION>
        <Text.HEADING text="존재하지 않는 게시글입니다." />
      </Wrapper.SECTION>
    );
  }

  return (
    <Wrapper.MAIN text="게시글">
      <div className="flex flex-col gap-2">
        <BoardDetail board={data} my={my} />
        <BoardComment id={id} my={my} />
        {/* <Link
          href="/board"
          className={`py-4 flex justify-center rounded-lg border-none bg-[#5A4FCF] hover:bg-[#786DE8] disabled:bg-[#A7A3D3]`}>
          <h3 className={`text-white whitespace-nowrap text-base font-medium`}>목록으로</h3>
        </Link> */}
      </div>
    </Wrapper.MAIN>
  );
}
