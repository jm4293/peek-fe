'use client';

import { useBoardListQuery } from '@/hooks';
import { IBoard } from '@/types/interface';
import { HeartSvg } from '@/asset/svg/heartSvg';
import { CommentSvg } from '@/asset/svg/commentSvg';
import { useRouter } from 'next/navigation';
import InfinityListWrapper from '@/components/infinity-list/infinityListWrapper';
import InfinityList from '@/components/infinity-list/infinityList';
import Text from '@/components/text/text';
import { useCallback } from 'react';
import Wrapper from '@/components/wrapper/wrapper';

export default function Board() {
  const router = useRouter();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useBoardListQuery();

  const clickHandler = useCallback(
    (params: { event: React.MouseEvent<HTMLDivElement, MouseEvent>; boardSeq: number }) => {
      const { event, boardSeq } = params;

      event.stopPropagation();

      router.push(`/board/detail/${boardSeq}`);
    },
    [],
  );

  const renderItem = (page: IBoard) => {
    const { boardSeq, title, likeCount, commentCount, viewCount, user } = page;

    return (
      <Wrapper>
        <div className="flex flex-col gap-4 cursor-pointer" onClick={(event) => clickHandler({ event, boardSeq })}>
          <div className="flex items-center gap-2">
            <Text value={`${String(boardSeq)}.`} color="gray" nowrap />
            <Text value={title} weight="bold" nowrap ellipsis />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <HeartSvg />
                <Text value={String(likeCount)} color="gray" />
              </div>
              <div className="flex items-center gap-1">
                <CommentSvg />
                <Text value={String(commentCount)} color="gray" />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <Text value="조회수" />
                <Text value={String(viewCount)} color="gray" />
              </div>
              <div className="flex items-center gap-1">
                <Text value="작성자" />
                <Text value={user.nickname} color="gray" />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  };

  return (
    <>
      <InfinityListWrapper
        total={data?.total}
        renderList={
          <InfinityList<IBoard>
            data={data?.boards}
            renderItem={renderItem}
            total={data?.total}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        }
      />
    </>
  );
}
