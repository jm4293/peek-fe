'use client';

import { DayjsUtil } from '@/utils';
import Link from 'next/link';
import { use } from 'react';

import { ShareButton } from '@/components/button';
import { Thumbnail } from '@/components/image';
import { PreText, Text } from '@/components/text';
import { EmptyDataView, InternalErrorView, Wrapper } from '@/components/wrapper';

import { BoardModel, useBoardMutation } from '@/services/board';
import { UserAccountModel } from '@/services/user';

import { ResponseType } from '@/shared/types';

interface Props {
  board: Promise<ResponseType<BoardModel | null>>;
  userInfo: UserAccountModel | null;
}

export default function BoardDetail(props: Props) {
  const { board, userInfo } = props;

  const { data, success } = use(board);

  const { deleteBoardMutation } = useBoardMutation();

  const deleteClickHandler = () => {
    if (!data) {
      return;
    }

    if (confirm('게시글을 삭제하시겠습니까?')) {
      deleteBoardMutation.mutate({ boardId: data.id });
    }
  };

  if (!success) {
    return <InternalErrorView />;
  }

  if (!data) {
    return <EmptyDataView text="게시글" />;
  }

  return (
    <>
      <Wrapper.SECTION>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Thumbnail thumbnail={data.userAccount.user.thumbnail} size={24} />
            <div className="flex flex-col">
              <Text.HEADING text={data.userAccount.user.nickname} />
              <Text.CAPTION text={DayjsUtil.of(data.createdAt).formatYYMMDDHHmm()} color="gray" />
            </div>
          </div>
          <ShareButton text="게시글" />
        </div>
      </Wrapper.SECTION>

      <Wrapper.SECTION>
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-2 flex-wrap">
            <Text.PARAGRAPH text={`[${data.stockCategory.name}]`} color="gray" className="flex-shrink-0" />
            <Text.HEADING text={data.title} className="break-words" />
          </div>

          <PreText text={data.boardArticle.content} />

          {data.userAccount.uuid === userInfo?.uuid && (
            <div className="flex items-center justify-end gap-4">
              <div className="cursor-pointer" onClick={deleteClickHandler}>
                <Text.PARAGRAPH text="삭제하기" color="red" />
              </div>
              <Link href={`/board/${data.id}/modify`}>
                <Text.PARAGRAPH text="수정하기" color="blue" />
              </Link>
            </div>
          )}
        </div>
      </Wrapper.SECTION>
    </>
  );
}
