'use client';

import { useBoardCategoryList, useBoardList } from '@/hooks';
import { Dayjs } from '@/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiComment, BiHeart } from 'react-icons/bi';

import InfinityList from '@/components/infinity-list/infinityList';
import Text from '@/components/text/text';
import Wrapper from '@/components/wrapper/wrapper';

import { BoardTypeEnumList } from '@/constant/enum/board';

import { IBoardRes } from '@/types/res';

export default function Board() {
  const router = useRouter();
  const [category, setCategory] = useState<number | null>(null);

  const boardCategoryList = useBoardCategoryList();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useBoardList({
    category,
  });

  const clickHandler = (params: { event: React.MouseEvent<HTMLDivElement, MouseEvent>; id: number }) => {
    const { event, id } = params;

    event.stopPropagation();

    router.push(`/board/${id}`);
  };

  const renderItem = (item: IBoardRes) => {
    const { id, type, title, createdAt, commentCount, likeCount, userAccount } = item;

    return (
      <li key={id}>
        <Wrapper>
          <div className="flex flex-col gap-4" onClick={(event) => clickHandler({ event, id })}>
            <div className="flex justify-between items-center gap-2">
              <div className="flex gap-2">
                <Text value={`[${BoardTypeEnumList[type].label}]`} color={`${BoardTypeEnumList[type].color}`} />
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
                <Text value={userAccount.user.nickname} color="gray" />
              </div>
            </div>
          </div>
        </Wrapper>
      </li>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Wrapper>
        <div className="flex items-center gap-4">
          {boardCategoryList.data?.reduce<React.ReactNode[]>(
            (acc, item) => {
              acc.push(
                <Text
                  key={item.id}
                  value={item.name}
                  size={category === item.id ? 'xl' : 'base'}
                  color={category === item.id ? 'black' : 'gray'}
                  weight={category === item.id ? 'bold' : 'normal'}
                  onClick={() => setCategory(item.id)}
                />,
              );
              return acc;
            },
            [
              <Text
                key="all"
                value="전체"
                size={category === null ? 'xl' : 'base'}
                color={category === null ? 'black' : 'gray'}
                weight={category === null ? 'bold' : 'normal'}
                onClick={() => setCategory(null)}
              />,
            ],
          )}
        </div>
      </Wrapper>

      <InfinityList<IBoardRes>
        renderItem={renderItem}
        data={data?.boards}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}
