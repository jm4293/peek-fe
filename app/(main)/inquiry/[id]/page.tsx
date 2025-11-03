import { EmptyDataView, InternalErrorView, Wrapper } from '@/components/wrapper';

import { inquiryDetailAction } from '@/services/inquiry/actions';

import InquiryDetail from './InquiryDetail';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function UserInquiryDetailPage(props: IProps) {
  const { id } = await props.params;

  const { data, success } = await inquiryDetailAction(id);

  if (!success) {
    return (
      <Wrapper.MAIN text="문의">
        <InternalErrorView />
      </Wrapper.MAIN>
    );
  }

  if (!data) {
    return (
      <Wrapper.MAIN text="문의">
        <EmptyDataView text="문의 내역" />
      </Wrapper.MAIN>
    );
  }

  return (
    <Wrapper.MAIN text="문의">
      <InquiryDetail data={data} />
    </Wrapper.MAIN>
  );
}
