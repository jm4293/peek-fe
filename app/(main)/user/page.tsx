import UserInfo from '@/app/(main)/user/_components/userInfo';
import WebWorkerConfig from '@/common/web-worker/web-worker.config';

export default function Page() {
  return (
    <>
      <WebWorkerConfig>
        <UserInfo />
      </WebWorkerConfig>
    </>
  );
}
