'use client';

import { DayjsUtil } from '@/utils';
import { Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Thumbnail } from '@/components/image';
import { InfinityList } from '@/components/infinity-list';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useQueryParams } from '@/hooks/queryParams';

import { IBoardModel, useBoardList } from '@/services/board';

export default function BoardList() {
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
          <Link href={`/board/${id}`}>
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

            <div className="flex justify-between items-center gap-4">
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <Heart color="#8b8b8e" size={18} />
                  <Text.PARAGRAPH text={String(likeCount)} color="gray" />
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle color="#8b8b8e" size={18} />
                  <Text.PARAGRAPH text={String(commentCount)} color="gray" />
                </div>
              </div>

              <Text.CAPTION text={DayjsUtil.of(createdAt).formatYYMMDDHHmm()} color="gray" />
            </div>
          </Link>
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
