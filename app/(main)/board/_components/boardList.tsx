'use client';

import { useBoardListQuery } from '@/hooks';
import { AxiosResponse } from 'axios';
import { ResConfig } from '@/types/res.config';
import { IBoardListRes } from '@/types/res';
import { IBoard } from '@/types/interface';
import { HeartSvg } from '@/asset/svg/heartSvg';
import { CommentSvg } from '@/asset/svg/commentSvg';
import { useRouter } from 'next/navigation';
import InfinityListWrapper from '@/components/infinity-list/infinityListWrapper';
import InfinityList from '@/components/infinity-list/infinityList';
import Text from '@/components/text/text';

export default function BoardList() {
  const router = useRouter();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useBoardListQuery();

  const onClickHandler = (params: { event: React.MouseEvent<HTMLDivElement, MouseEvent>; boardSeq: number }) => {
    const { event, boardSeq } = params;

    event.stopPropagation();

    console.log('boardSeq', boardSeq);

    router.push(`/board/detail/${boardSeq}`);
  };

  const renderItem = (page: AxiosResponse<ResConfig<IBoardListRes>, any>) => {
    const { boards, total } = page.data.data;

    return total > 0 ? (
      boards.map((board: IBoard) => (
        <div
          key={board.boardSeq}
          className="w-full flex flex-col gap-3 cursor-pointer"
          onClick={(event) => onClickHandler({ event, boardSeq: board.boardSeq })}>
          <div className="flex flex-col gap-1">
            <Text className="font-bold" value={board.title} color="#000000" />
            <div className="grid grid-cols-6">
              <Text className="col-span-5 line-clamp-2" value={board.content} color="#000000" />

              <div className="flex justify-end gap-1 col-span-1">
                <Text value="작성자" color="#000000" />
                <Text value={board.user.nickname} color="#000000" />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-4">
              <div className="flex gap-1">
                <HeartSvg />
                <Text value={String(board.likeCount)} color="#000000" />
              </div>
              <div className="flex gap-1">
                <CommentSvg />
                <Text value={String(board.commentCount)} color="#000000" />
              </div>
            </div>
            <div className="flex gap-1">
              <Text value="조회수" color="#000000" />
              <Text value={String(board.viewCount)} color="#000000" />
            </div>
          </div>
        </div>
      ))
    ) : (
      <Text value="게시글이 없습니다." color="#000000" />
    );
  };

  return (
    <InfinityListWrapper
      total={data?.[0].data.data.total}
      renderList={
        <InfinityList<AxiosResponse<ResConfig<IBoardListRes>, any>>
          data={data || []}
          renderItem={renderItem}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      }
    />
  );
}
