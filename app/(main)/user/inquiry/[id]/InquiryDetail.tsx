import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { IInquiryModel } from '@/services/inquiry';

interface IProps {
  inquiry: IInquiryModel;
}

export default function InquiryDetail(props: IProps) {
  const { inquiry } = props;

  return (
    <Wrapper.SECTION>
      <Text.HEADING text={inquiry.title} />
    </Wrapper.SECTION>
  );
}
