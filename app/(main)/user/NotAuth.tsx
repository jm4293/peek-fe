'use client';

import { useRouter } from 'next/navigation';

import { EditableText } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

export default function NotAuth() {
  const router = useRouter();

  const clickHandler = () => {
    router.push('/auth/login');
  };

  return (
    <Wrapper title="로그인이 필요합니다">
      <EditableText.PARAGRAPH text="로그인 하러가기" onClick={clickHandler} />
    </Wrapper>
  );
}
