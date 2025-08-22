'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiComment, BiHeart } from 'react-icons/bi';

import { Thumbnail } from '@/components/image';
import { InfinityList } from '@/components/infinity-list';
import { EditableText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useQueryParams } from '@/hooks/queryParams';

import { IBoardModel, useBoardList } from '@/services/board';

import { Dayjs } from '@/utils/dayjs';

export default function BoardList() {
  const router = useRouter();

  const [list, setList] = useState<IBoardModel[]>([]);

  const { getQuery } = useQueryParams();
  const category = getQuery('category');

  const {
    data: boardList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isSuccess,
  } = useBoardList({ category: category ? Number(category) : undefined });

  const clickHandler = (id: number) => {
    router.push(`/board/${id}`);
  };

  useEffect(() => {
    if (isSuccess && boardList) {
      setList(boardList.boards);
    }
  }, [isSuccess, boardList]);

  const renderItem = (item: IBoardModel) => {
    const { id, category, title, createdAt, commentCount, likeCount, userAccount } = item;

    return (
      <li key={id}>
        <Wrapper>
          <div className="flex flex-col gap-1" onClick={() => clickHandler(id)}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Text.PARAGRAPH text={`[${category.name}]`} color="gray" />
                <EditableText.HEADING text={title} />
              </div>
              <div className="flex items-center gap-1">
                <Thumbnail thumbnail={userAccount.user.thumbnail} w={18} />
                <EditableText.PARAGRAPH text={userAccount.user.nickname} color="gray" />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <BiHeart color="#666666" />
                  <EditableText.PARAGRAPH text={String(likeCount)} color="gray" />
                </div>
                <div className="flex items-center gap-1">
                  <BiComment color="#666666" />
                  <EditableText.PARAGRAPH text={String(commentCount)} color="gray" />
                </div>
              </div>

              <EditableText.CAPTION text={Dayjs.of(createdAt).formatYYMMDDHHmm()} color="gray" />
            </div>
          </div>
        </Wrapper>
      </li>
    );
  };

  if (list.length === 0) {
    return (
      <Wrapper>
        <EditableText.HEADING text="게시글이 없습니다." />
      </Wrapper>
    );
  }

  return (
    <InfinityList hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage}>
      {list.map(renderItem)}
    </InfinityList>
  );
}
