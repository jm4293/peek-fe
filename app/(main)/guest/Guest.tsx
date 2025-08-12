'use client';

import { useRouter } from 'next/navigation';

import { EditableText } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

export default function Guest() {
  const router = useRouter();

  const clickHandler = () => {
    router.push('/auth/login');
  };

  return (
    <Wrapper title="로그인이 필요합니다">
      <EditableText.HEADING text="로그인 하러가기" onClick={clickHandler} />
    </Wrapper>
  );
}
