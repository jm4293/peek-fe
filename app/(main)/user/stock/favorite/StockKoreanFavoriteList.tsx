'use client';

import Link from 'next/link';

import { InfinityList } from '@/components/infinity-list';
import { Text } from '@/components/text';
import { EmptyDataView, InternalErrorView, LoadingView, Wrapper } from '@/components/wrapper';

import { useStockKoreanFavoriteList } from '@/services/stock';
import { UserStockFavoriteModel } from '@/services/user';

export default function StockKoreanFavoriteList() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isPending, isSuccess } = useStockKoreanFavoriteList();

  const renderItem = (item: UserStockFavoriteModel) => {
    const { createdAt, stockKoreanCompany } = item;

    return (
      <li key={stockKoreanCompany.id}>
        <Wrapper.SECTION>
          <Link href={`/stock/detail/${stockKoreanCompany.code}`} className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Text.PARAGRAPH text={`[${stockKoreanCompany.companyName}]`} color="gray" />
                <Text.HEADING text={stockKoreanCompany.code} />
              </div>
            </div>

            {/* <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <Heart color="#8b8b8e" size={18} />
                  <Text.PARAGRAPH text={String(likeCount)} color="gray" />
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle color="#8b8b8e" size={18} />
                  <Text.PARAGRAPH text={String(commentCount)} color="gray" />
                </div>
              </div>

              <Text.PARAGRAPH text={DayjsUtil.of(createdAt).formatYYMMDDHHmm()} color="gray" />
            </div> */}
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

  if (data.favoriteStockList.length === 0) {
    return <EmptyDataView text="관심 종목" />;
  }

  return (
    <InfinityList hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage}>
      {data.favoriteStockList.map(renderItem)}
    </InfinityList>
  );
}
