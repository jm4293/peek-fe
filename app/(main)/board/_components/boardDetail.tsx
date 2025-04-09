import Text from '@/components/text/text';
import Image from '@/components/image/image';
import { ImageTypeEnum } from '@/constant/enum';
import Input from '@/components/input/input';
import Textarea from '@/components/textarea/textarea';
import { IBoardDetailRes } from '@/types/res';
import { GetBoardDetail } from '@/app/(main)/board/detail/[boardSeq]/action';
import BoardDetailButton from '@/app/(main)/board/_components/boardDetailButton';
import Wrapper from '@/components/wrapper/wrapper';
import Thumbnail from '@/components/image/thumbnail';
import dayjs from 'dayjs';

interface IProps {
  boardSeq: string;
  isAuth: boolean;
}

export default async function BoardDetail(props: IProps) {
  const { boardSeq, isAuth } = props;

  const boardDetail: IBoardDetailRes = await GetBoardDetail(Number(boardSeq));

  const { board, isMine } = boardDetail;
  const { title, content, user, createdAt } = board;

  console.log('content', content);

  return (
    <Wrapper>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Text value="작성자" />
            <Text value={user.nickname} color="gray" />
          </div>

          <div className="col-span-5 flex flex-col gap-4">
            <div>
              <Text value={title} />
              <Text value={dayjs(createdAt).format('YYYY-MM-DD HH:mm')} />
            </div>

            <div className="border-[1px]" />

            <pre className="whitespace-pre-line">{content}</pre>
          </div>
        </div>

        {isAuth && isMine && <BoardDetailButton boardSeq={boardSeq} />}
      </div>
    </Wrapper>
  );
}
