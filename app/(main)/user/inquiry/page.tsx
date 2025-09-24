import { Wrapper } from '@/components/wrapper';

import { myAccountAction } from '@/services/user';

import InquiryList from './InquiryList';
import { InquiryRegisterButton } from './InquiryRegisterButton';

export default async function UserInquiryPage() {
  const { success: isAuth } = await myAccountAction();

  return (
    <Wrapper.MAIN text="문의하기">
      <InquiryList />

      <InquiryRegisterButton isAuth={isAuth} />
    </Wrapper.MAIN>
  );
}
