'use client';

import { DayjsUtil } from '@/utils';
import { Heart, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Thumbnail } from '@/components/image';
import { InfinityList } from '@/components/infinity-list';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useQueryParams } from '@/hooks/queryParams';

import { IBoardModel, useBoardList } from '@/services/board';

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
    router.push(`/board/${id}`, { scroll: true });
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
        <Wrapper.SECTION>
          <div className="flex flex-col gap-1" onClick={() => clickHandler(id)}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Text.PARAGRAPH text={`[${category.name}]`} color="gray" />
                <Text.HEADING text={title} />
              </div>
              <div className="flex items-center gap-1">
                <Thumbnail thumbnail={userAccount.user.thumbnail} size={16} />
                <Text.PARAGRAPH text={userAccount.user.nickname} />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <Heart color="#8b8b8e" size={16} />
                  <Text.PARAGRAPH text={String(likeCount)} color="gray" />
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle color="#8b8b8e" size={16} />
                  <Text.PARAGRAPH text={String(commentCount)} color="gray" />
                </div>
              </div>

              <Text.CAPTION text={DayjsUtil.of(createdAt).formatYYMMDDHHmm()} color="gray" />
            </div>
          </div>
        </Wrapper.SECTION>
      </li>
    );
  };

  if (list.length === 0) {
    return (
      <Wrapper.SECTION>
        <Text.HEADING text="게시글이 없습니다." />
      </Wrapper.SECTION>
    );
  }

  return (
    <InfinityList hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage}>
      {list.map(renderItem)}
    </InfinityList>
  );
}
