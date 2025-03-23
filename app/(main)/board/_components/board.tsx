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
    const { boardSeq, title, content, likeCount, commentCount, viewCount, user } = page;

    return (
      <div
        key={`board-list-${boardSeq}`}
        className="w-full flex flex-col gap-3 cursor-pointer"
        onClick={(event) => clickHandler({ event, boardSeq })}>
        <div className="flex flex-col gap-1">
          <Text className="font-bold" value={title} color="#000000" />
          <div className="grid grid-cols-6">
            <Text className="col-span-5 line-clamp-2" value={content} color="#000000" />

            <div className="flex justify-end gap-1 col-span-1">
              <Text value="작성자" color="#000000" />
              <Text value={user.nickname} color="#000000" />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div className="flex gap-1">
              <HeartSvg />
              <Text value={String(likeCount)} color="#000000" />
            </div>
            <div className="flex gap-1">
              <CommentSvg />
              <Text value={String(commentCount)} color="#000000" />
            </div>
          </div>
          <div className="flex gap-1">
            <Text value="조회수" color="#000000" />
            <Text value={String(viewCount)} color="#000000" />
          </div>
        </div>
      </div>
    );
  };

  return (
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
  );
}
