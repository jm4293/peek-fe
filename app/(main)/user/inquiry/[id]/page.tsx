import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { inquiryDetailAction } from '@/services/inquiry/actions';

import InquiryDetail from './InquiryDetail';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function UserInquiryDetailPage(props: IProps) {
  const { id } = await props.params;

  const { data, success } = await inquiryDetailAction(id);

  console.log('inquiryDetailAction', { data, success });

  if (!success) {
    return (
      <Wrapper.SECTION>
        <Text.HEADING text="문의 불러오는데 실패했습니다." />
      </Wrapper.SECTION>
    );
  }

  if (!data) {
    return (
      <Wrapper.SECTION>
        <Text.HEADING text="존재하지 않는 문의입니다." />
      </Wrapper.SECTION>
    );
  }

  return (
    <Wrapper.MAIN text="문의">
      <InquiryDetail inquiry={data} />
    </Wrapper.MAIN>
  );
}
