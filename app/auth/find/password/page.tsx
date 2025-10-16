import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import VerifyEmail from './VerifyEmail';

export default function FindPasswordPage() {
  return (
    <Wrapper.MAIN text="비밀번호 찾기">
      <VerifyEmail />
      <Text.CAPTION text="이메일 계정만 비밀번호 찾기가 가능합니다." />
    </Wrapper.MAIN>
  );
}
