'use client';

import { useRouter } from 'next/navigation';
import Text from '@/components/text/text';

export default function DeactivateLogin() {
  const router = useRouter();

  const onClickHandler = () => {
    router.push('/auth/login');
  };

  return (
    <div className="flex flex-col gap-4">
      <Text value="로그인이 필요합니다." color="#000000" />
      <Text value="로그인 하러가기" color="#000000" onClick={onClickHandler} />
    </div>
  );
}
