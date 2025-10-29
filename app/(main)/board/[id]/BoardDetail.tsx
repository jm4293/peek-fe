'use client';

import { DayjsUtil } from '@/utils';
import { Share } from 'lucide-react';
import Link from 'next/link';

import { Thumbnail } from '@/components/image';
import { PreText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { IBoardModel, useBoardMutation } from '@/services/board';
import { IUserAccountModel } from '@/services/user';

interface IProps {
  board: IBoardModel;
  userInfo: IUserAccountModel | null;
}

export default function BoardDetail(props: IProps) {
  const { board, userInfo } = props;

  const { deleteBoardMutation } = useBoardMutation();

  const deleteClickHandler = () => {
    if (confirm('게시글을 삭제하시겠습니까?')) {
      deleteBoardMutation.mutate(board.id);
    }
  };

  return (
    <>
      <Wrapper.SECTION>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Thumbnail thumbnail={board.userAccount.user.thumbnail} size={32} />
            <div className="flex flex-col">
              <Text.HEADING text={board.userAccount.user.nickname} />
              <Text.CAPTION text={DayjsUtil.of(board.createdAt).formatYYMMDDHHmm()} color="gray" />
            </div>
          </div>
          <Share />
        </div>
      </Wrapper.SECTION>

      <Wrapper.SECTION>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Text.PARAGRAPH text={`[${board.category.name}]`} color="gray" />
            <Text.HEADING text={board.title} />
          </div>

          <PreText text={board.article.content} />

          {board.userAccount.id === userInfo?.id && (
            <div className="flex items-center justify-end gap-4">
              <div className="cursor-pointer" onClick={deleteClickHandler}>
                <Text.PARAGRAPH text="삭제하기" color="red" />
              </div>
              <Link href={`/board/${board.id}/modify`}>
                <Text.PARAGRAPH text="수정하기" color="blue" />
              </Link>
            </div>
          )}
        </div>
      </Wrapper.SECTION>
    </>
  );
}
