'use client';

import { DayjsUtil } from '@/utils';
import { Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';

import { InfinityList } from '@/components/infinity-list';
import { Text } from '@/components/text';
import { EmptyDataView, InternalErrorView, LoadingView, Wrapper } from '@/components/wrapper';

import { BoardModel, useMineBoardList } from '@/services/board';

export default function MineBoardList() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isPending, isSuccess } = useMineBoardList();

  const renderItem = (item: BoardModel) => {
    const { id, stockCategory, title, createdAt, commentCount, likeCount } = item;

    return (
      <li key={id}>
        <Wrapper.SECTION>
          <Link href={`/board/${id}`} className="flex flex-col gap-1">
            <div className="w-full flex justify-between items-center">
              <div className="w-full flex items-center gap-2">
                <Text.PARAGRAPH text={`[${stockCategory.name}]`} color="gray" className="whitespace-nowrap" />
                <Text.HEADING text={title} className="truncate" />
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
          </Link>
        </Wrapper.SECTION>
      </li>
    );
  };

  if (isPending) {
    return <LoadingView />;
  }

  if (!isSuccess) {
    return <InternalErrorView />;
  }

  if (data.boardList.length === 0) {
    return <EmptyDataView text="작성한 게시글" />;
  }

  return (
    <InfinityList hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage}>
      {data.boardList.map(renderItem)}
    </InfinityList>
  );
}
