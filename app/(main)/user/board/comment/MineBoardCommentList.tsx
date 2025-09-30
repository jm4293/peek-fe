'use client';

import { DayjsUtil } from '@/utils';
import Link from 'next/link';

import { InfinityList } from '@/components/infinity-list';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { IBoardCommentModel, useBoardCommentListMine } from '@/services/board';

export default function MineBoardCommentList() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isPending, isSuccess } = useBoardCommentListMine();

  const renderItem = (item: IBoardCommentModel) => {
    const { id, content, createdAt, board } = item;

    return (
      <li key={id}>
        <Wrapper.SECTION>
          <Link href={`/board/${board.id}`} className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Text.PARAGRAPH text={`[${board.category.name}]`} color="gray" />
              <Text.PARAGRAPH text={board.title} />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Text.PARAGRAPH text="댓글:" />
                <Text.PARAGRAPH text={content} />
              </div>

              <Text.CAPTION text={DayjsUtil.of(createdAt).formatYYMMDDHHmm()} color="gray" />
            </div>
          </Link>
        </Wrapper.SECTION>
      </li>
    );
  };

  if (isPending) {
    return (
      <Wrapper.SECTION>
        <Text.HEADING text="로딩중..." />
      </Wrapper.SECTION>
    );
  }

  if (!isSuccess) {
    return (
      <Wrapper.SECTION>
        <Text.HEADING text="오류가 발생했습니다." />
      </Wrapper.SECTION>
    );
  }

  if (data.boardCommentList.length === 0) {
    return (
      <Wrapper.SECTION>
        <Text.HEADING text="작성한 게시글 댓글이 없습니다." />
      </Wrapper.SECTION>
    );
  }

  return (
    <InfinityList hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage}>
      {data.boardCommentList.map(renderItem)}
    </InfinityList>
  );
}
