'use client';

import { JSX, useEffect, useRef } from 'react';

import { LineSkeleton } from '../skeleton';

interface Props {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  children: JSX.Element | JSX.Element[];
  maxHeight?: number;
}

export const InfinityList = (props: Props) => {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, children, maxHeight = 70 } = props;

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

  // return (
  //   <ol className={`w-full max-h-[${maxHeight}vh] overflow-y-auto flex flex-col gap-2 pb-2`}>
  //     {children}
  //     <div ref={loadMoreRef} className="flex justify-center items-center">
  //       {isFetchingNextPage && <LineSkeleton />}
  //     </div>
  //   </ol>
  // );

  return (
    <ol className="flex flex-col gap-2">
      {children}
      <div ref={loadMoreRef} className="flex justify-center items-center">
        {isFetchingNextPage && <LineSkeleton />}
      </div>
    </ol>
  );
};
