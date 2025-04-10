'use client';

import { JSX, useEffect, useRef } from 'react';

import LineSkeleton from '@/components/skeleton/lineSkeleton';
import Text from '@/components/text/text';
import Wrapper from '@/components/wrapper/wrapper';

interface IProps<T> {
  data: T[] | undefined;
  renderItem: (item: T) => JSX.Element | JSX.Element[];
  total: number | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export default function InfinityList<T>(props: IProps<T>) {
  const { data = [], renderItem, total = 0, fetchNextPage, hasNextPage, isFetchingNextPage } = props;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      {total > 0 ? (
        <>
          <div className="w-full flex flex-col gap-2">{data.map(renderItem)}</div>

          <div ref={loadMoreRef} className="flex justify-center items-center">
            {isFetchingNextPage && <LineSkeleton text="로딩!!" height={2} />}
          </div>
        </>
      ) : (
        <Wrapper>
          <Text value="게시글이 없습니다." align="center" />
        </Wrapper>
      )}
    </>
  );
}
