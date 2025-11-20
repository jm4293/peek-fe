import { Suspense } from 'react';

import { SkeletonSuspense } from '@/components/skeleton';
import { Wrapper } from '@/components/wrapper';

import { getNoticeDetail } from '@/services/notice';

import NoticeDetail from './NoticeDetail';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function UserNoticeDetailPage(props: Props) {
  const { id } = await props.params;

  const notice = getNoticeDetail(id);

  return (
    <Wrapper.MAIN text="공지사항">
      <Suspense fallback={<SkeletonSuspense />}>
        <NoticeDetail notice={notice} />
      </Suspense>
    </Wrapper.MAIN>
  );
}
