import UserInfo from '@/app/(main)/user/_components/userInfo';
import MessagingConfig from '@/common/firebase/messaging.config';

export default function Page() {
  return (
    <>
      <MessagingConfig>
        <UserInfo />
      </MessagingConfig>
    </>
  );
}
