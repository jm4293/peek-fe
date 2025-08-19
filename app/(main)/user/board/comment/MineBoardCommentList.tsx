'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { InfinityList } from '@/components/infinity-list';
import { EditableText } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { IBoardCommentModel, useBoardCommentListMineQuery } from '@/services/board';

import { BoardTypeEnumList } from '@/shared/enum/board';

import { Dayjs } from '@/utils/dayjs';

export default function MineBoardCommentList() {
  const router = useRouter();

  const [list, setList] = useState<IBoardCommentModel[]>([]);

  const {
    data: commentList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isSuccess,
  } = useBoardCommentListMineQuery();

  const clickHandler = (params: { event: React.MouseEvent<HTMLDivElement, MouseEvent>; id: number }) => {
    const { event, id } = params;

    router.push(`/board/${id}`);
  };

  useEffect(() => {
    if (isSuccess && commentList) {
      setList(commentList.boardComments);
    }
  }, [isSuccess, commentList]);

  const renderItem = (item: IBoardCommentModel) => {
    const { id, content, createdAt, board } = item;

    return (
      <li key={id}>
        <Wrapper>
          <div className="flex flex-col gap-4" onClick={(event) => clickHandler({ event, id: board.id })}>
            <div className="flex items-center gap-2">
              <EditableText.PARAGRAPH text={`[${BoardTypeEnumList[board.type].label}]`} />
              <EditableText.PARAGRAPH text={board.title} />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <EditableText.PARAGRAPH text="댓글:" />
                <EditableText.PARAGRAPH text={content} />
              </div>
              <EditableText.PARAGRAPH text={Dayjs.of(createdAt).formatYYMMDDHHmm()} color="gray" />
            </div>
          </div>
        </Wrapper>
      </li>
    );
  };

  if (list.length === 0) {
    return (
      <Wrapper>
        <EditableText.HEADING text="작성한 게시글 댓글이 없습니다." />
      </Wrapper>
    );
  }

  return (
    <InfinityList hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage}>
      {list.map(renderItem)}
    </InfinityList>
  );
}
