'use client';

import { useRouter } from 'next/navigation';
import Text from '@/components/text/text';
import Wrapper from '@/components/wrapper/wrapper';

export default function UserGuest() {
  const router = useRouter();

  const clickHandler = () => {
    router.push('/auth/login');
  };

  return (
    <Wrapper>
      <div className="flex flex-col gap-4">
        <Text value="로그인이 필요합니다" color="#000000" weight="bold" />
        <Text value="로그인 하러가기" color="#000000" onClick={clickHandler} />
      </div>
    </Wrapper>
  );
}
