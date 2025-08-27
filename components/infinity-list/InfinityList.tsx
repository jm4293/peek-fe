'use client';

import { JSX, useEffect, useRef } from 'react';

import { LineSkeleton } from '../skeleton';

interface IProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  children: JSX.Element | JSX.Element[];
}

export const InfinityList = (props: IProps) => {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, children } = props;

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
    <ol className="w-full flex flex-col gap-2 py-2 max-h-[70vh] overflow-y-auto">
      {children}
      <div ref={loadMoreRef} className="flex justify-center items-center">
        {isFetchingNextPage && <LineSkeleton h={2} />}
      </div>
    </ol>
  );
};
