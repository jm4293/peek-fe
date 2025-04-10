'use client';

import { useBoardListQuery } from '@/hooks';
import { Dayjs } from '@/utils';
import { useRouter } from 'next/navigation';
import { BiComment, BiHeart } from 'react-icons/bi';

import InfinityList from '@/components/infinity-list/infinityList';
import InfinityListWrapper from '@/components/infinity-list/infinityListWrapper';
import Text from '@/components/text/text';
import Wrapper from '@/components/wrapper/wrapper';

import { IBoard } from '@/types/interface';

export default function Board() {
  const router = useRouter();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useBoardListQuery();

  const clickHandler = (params: { event: React.MouseEvent<HTMLDivElement, MouseEvent>; boardSeq: number }) => {
    const { event, boardSeq } = params;

    event.stopPropagation();

    router.push(`/board/detail/${boardSeq}`);
  };

  const renderItem = (page: IBoard) => {
    const { boardSeq, title, likeCount, commentCount, viewCount, user, createdAt } = page;

    return (
      <Wrapper>
        <div className="flex flex-col gap-4 cursor-pointer" onClick={(event) => clickHandler({ event, boardSeq })}>
          <div className="flex justify-between items-center gap-2">
            <Text value={title} nowrap ellipsis />
            <Text value={Dayjs.formatYYMMDD(createdAt)} color="gray" nowrap />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <BiHeart color="#666666" />
                <Text value={String(likeCount)} color="gray" />
              </div>
              <div className="flex items-center gap-1">
                <BiComment color="#666666" />
                <Text value={String(commentCount)} color="gray" />
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Text value={user.nickname} color="gray" />
            </div>
          </div>
        </div>
      </Wrapper>
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
