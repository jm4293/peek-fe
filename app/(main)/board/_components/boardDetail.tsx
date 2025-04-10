import { Dayjs } from '@/utils';

import BoardDetailButton from '@/app/(main)/board/_components/boardDetailButton';
import { GetBoardDetail } from '@/app/(main)/board/detail/[boardSeq]/action';

import PreText from '@/components/text/preText';
import Text from '@/components/text/text';
import Wrapper from '@/components/wrapper/wrapper';

import { IBoardDetailRes } from '@/types/res';

interface IProps {
  boardSeq: string;
  isAuth: boolean;
}

export default async function BoardDetail(props: IProps) {
  const { boardSeq, isAuth } = props;

  const boardDetail: IBoardDetailRes = await GetBoardDetail(Number(boardSeq));

  const { board, isMine } = boardDetail;
  const { title, content, user, createdAt } = board;

  return (
    <Wrapper>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-2">
            <Text value={user.nickname} color="gray" />
            <Text value={Dayjs.formatMMDD(createdAt)} color="gray" />
          </div>

          <div className="col-span-5 flex flex-col gap-4">
            <Text value={title} />

            <div className="border-[1px]" />

            <PreText value={content} />
          </div>
        </div>

        {isAuth && isMine && <BoardDetailButton boardSeq={boardSeq} />}
      </div>
    </Wrapper>
  );
}
