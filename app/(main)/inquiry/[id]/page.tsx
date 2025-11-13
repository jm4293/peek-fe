import { Suspense } from 'react';

import { SkeletonSuspense } from '@/components/skeleton';
import { Wrapper } from '@/components/wrapper';

import { getInquiryDetail } from '@/services/inquiry/server';

import InquiryDetail from './InquiryDetail';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function UserInquiryDetailPage(props: Props) {
  const { id } = await props.params;

  const inquiry = getInquiryDetail(id);

  return (
    <Wrapper.MAIN text="문의">
      <Suspense fallback={<SkeletonSuspense />}>
        <InquiryDetail inquiry={inquiry} />
      </Suspense>
    </Wrapper.MAIN>
  );
}
