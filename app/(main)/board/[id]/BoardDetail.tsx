'use client';

import { useRouter } from 'next/navigation';

import { EditableText, Text } from '@/components/text';
import PreText from '@/components/text/PreText';
import { Wrapper } from '@/components/wrapper';

import { IBoardModel, useBoardMutation } from '@/services/board';
import { IUserAccountModel } from '@/services/user';

import { Dayjs } from '@/utils/dayjs';

interface IProps {
  board: IBoardModel;
  my: IUserAccountModel | null;
}

export default function BoardDetail(props: IProps) {
  const { board, my } = props;

  const router = useRouter();

  const { deleteBoardMutation } = useBoardMutation();

  const modifyClickHandler = () => {
    router.push(`/board/${board.id}/modify`);
  };

  const deleteClickHandler = () => {
    if (confirm('게시글을 삭제하시겠습니까?')) {
      deleteBoardMutation.mutate(board.id);
    }
  };

  return (
    <Wrapper>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-2">
            <Text.HEADING text={board.userAccount.user.nickname} />
            <Text.PARAGRAPH text={Dayjs.of(board.createdAt).formatMMDDHHmm()} color="gray" />
          </div>

          <div className="col-span-5 flex flex-col gap-4">
            <div className="flex gap-2">
              <Text.PARAGRAPH text={`[${board.category.name}]`} color="gray" />
              <Text.PARAGRAPH text={board.title} />
            </div>

            <div className="border-[1px]" />

            <PreText text={board.article.content} />
          </div>
        </div>

        {board.userAccount.email === my?.email && (
          <div className="flex justify-end gap-4">
            <EditableText.PARAGRAPH text="수정" color="blue" onClick={modifyClickHandler} />
            <EditableText.PARAGRAPH text="삭제" color="red" onClick={deleteClickHandler} />
          </div>
        )}
      </div>
    </Wrapper>
  );
}
