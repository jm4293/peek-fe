'use client';

import { DayjsUtil } from '@/utils';
import { useRouter } from 'next/navigation';

import { Thumbnail } from '@/components/image';
import { PreText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { IBoardModel, useBoardMutation } from '@/services/board';
import { IUserAccountModel } from '@/services/user';

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
    <>
      <Wrapper.SECTION>
        <Text.HEADING text="제목" />

        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <Text.PARAGRAPH text={`[${board.category.name}]`} color="gray" />
              <Text.HEADING text={board.title} />
            </div>
            <div className="flex items-center gap-1">
              <Thumbnail thumbnail={board.userAccount.user.thumbnail} size={16} />
              <Text.PARAGRAPH text={board.userAccount.user.nickname} />
            </div>
          </div>

          <div className="flex justify-end">
            <Text.CAPTION text={DayjsUtil.of(board.createdAt).formatYYMMDDHHmm()} color="gray" />
          </div>
        </div>
      </Wrapper.SECTION>
      <Wrapper.SECTION>
        <Text.HEADING text="내용" />

        <div className="flex flex-col gap-4">
          <PreText text={board.article.content} />

          {board.userAccount.id === my?.id && (
            <div className="flex items-center justify-end gap-2">
              <div className="cursor-pointer" onClick={deleteClickHandler}>
                <Text.PARAGRAPH text="삭제" color="red" />
              </div>
              <div className="cursor-pointer" onClick={modifyClickHandler}>
                <Text.PARAGRAPH text="수정" color="blue" />
              </div>
            </div>
          )}
        </div>
      </Wrapper.SECTION>
    </>
  );
}
