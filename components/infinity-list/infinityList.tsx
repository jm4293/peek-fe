'use client';

import { JSX, useEffect, useRef } from 'react';
import Skeleton from '@/components/skeleton/skeleton';
import Text from '@/components/text/text';

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
    <div className="flex flex-col items-center">
      {total > 0 ? (
        <>
          <div className="w-full flex flex-col gap-8">{data.map(renderItem)}</div>

          <div ref={loadMoreRef} className="flex justify-center items-center">
            {isFetchingNextPage && <Skeleton />}
          </div>
        </>
      ) : (
        <Text value="없습니다." color="#000000" />
      )}
    </div>
  );
}
