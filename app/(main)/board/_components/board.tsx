'use client';

import { useBoardListQuery } from '@/hooks';
import { Dayjs } from '@/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiComment, BiHeart } from 'react-icons/bi';

import InfinityList from '@/components/infinity-list/infinityList';
import InfinityListWrapper from '@/components/infinity-list/infinityListWrapper';
import Text from '@/components/text/text';
import Wrapper from '@/components/wrapper/wrapper';

import { IMARKET_TYPE, MARKET_TYPE } from '@/constant/stock';

import { IBoard } from '@/types/interface';

export default function Board() {
  const router = useRouter();

  const [marketType, setMarketType] = useState<IMARKET_TYPE>('ALL');

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useBoardListQuery({ marketType });

  const clickHandler = (params: { event: React.MouseEvent<HTMLDivElement, MouseEvent>; boardSeq: number }) => {
    const { event, boardSeq } = params;

    event.stopPropagation();

    router.push(`/board/detail/${boardSeq}`);
  };

  const renderTitle = (
    <div className="flex gap-4">
      {Object.keys(MARKET_TYPE).map((key) => (
        <Text
          key={key}
          value={MARKET_TYPE[key as keyof typeof MARKET_TYPE]}
          color={`${marketType === key ? 'black' : 'gray'}`}
          weight={`${marketType === key ? 'bold' : 'normal'}`}
          onClick={() => setMarketType(key as IMARKET_TYPE)}
        />
      ))}
    </div>
  );

  const renderItem = (page: IBoard) => {
    const { boardSeq, marketType, title, likeCount, commentCount, viewCount, user, createdAt } = page;

    return (
      <Wrapper>
        <div className="flex flex-col gap-4 cursor-pointer" onClick={(event) => clickHandler({ event, boardSeq })}>
          <div className="flex justify-between items-center gap-2">
            <div className="flex gap-2">
              <Text value={`[${String(MARKET_TYPE[marketType])}]`} color="gray" />
              <Text value={title} nowrap ellipsis />
            </div>
            <Text value={Dayjs.formatMMDD(createdAt)} color="gray" nowrap />
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
      titleRender={renderTitle}
    />
  );
}
