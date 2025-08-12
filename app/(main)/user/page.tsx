import User from '@/app/(main)/user/User';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { myAction } from '@/services/user';

export default async function UserPage() {
  const { data: my } = await myAction();

  if (!my) {
    return (
      <Wrapper title="로그인이 필요합니다">
        <Text.PARAGRAPH text="로그인 하러가기" />
      </Wrapper>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Text.SUBTITLE text="회원 정보" />
      <User my={my} />
    </div>
  );
}
