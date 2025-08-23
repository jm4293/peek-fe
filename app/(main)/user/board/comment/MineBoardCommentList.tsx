'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { InfinityList } from '@/components/infinity-list';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { IBoardCommentModel, useBoardCommentListMineQuery } from '@/services/board';

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

  const clickHandler = (id: number) => {
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
        <Wrapper.SECTION>
          <div className="flex flex-col gap-1" onClick={() => clickHandler(board.id)}>
            <div className="flex items-center gap-2">
              <Text.PARAGRAPH text={`[${board.category.name}]`} color="gray" />
              <Text.PARAGRAPH text={board.title} />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Text.PARAGRAPH text="댓글:" />
                <Text.PARAGRAPH text={content} />
              </div>

              <Text.CAPTION text={Dayjs.of(createdAt).formatYYMMDDHHmm()} color="gray" />
            </div>
          </div>
        </Wrapper.SECTION>
      </li>
    );
  };

  if (list.length === 0) {
    return (
      <Wrapper.SECTION>
        <Text.HEADING text="작성한 게시글 댓글이 없습니다." />
      </Wrapper.SECTION>
    );
  }

  return (
    <InfinityList hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage}>
      {list.map(renderItem)}
    </InfinityList>
  );
}
