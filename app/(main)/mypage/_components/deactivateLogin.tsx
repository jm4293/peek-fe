'use client';

import { useRouter } from 'next/navigation';
import TextClient from '@/components/text/textClient';

export default function DeactivateLogin() {
  const router = useRouter();

  const onClickHandler = () => {
    router.push('/auth/login');
  };

  return (
    <div className="flex flex-col gap-4">
      <TextClient value="로그인이 필요합니다." color="#000000" />
      <TextClient value="로그인 하러가기" color="#000000" onClick={onClickHandler} />
    </div>
  );
}
