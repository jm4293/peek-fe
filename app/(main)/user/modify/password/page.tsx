import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { myAction } from '@/services/user';

import { UserAccountTypeEnum } from '@/shared/enum/user';

import NotAuth from '../../NotAuth';
import ModifyPassword from './ModifyPassword';

export default async function ModifyPasswordPage() {
  const { data: my } = await myAction();

  if (!my) {
    return <NotAuth />;
  }

  if (my.userAccountType !== UserAccountTypeEnum.EMAIL) {
    return (
      <div className="flex flex-col gap-4">
        <Text.SUBTITLE text="비밀번호 변경" />
        <Wrapper>
          <Text.HEADING text="이메일 회원만 비밀번호 변경이 가능합니다." />
        </Wrapper>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Text.SUBTITLE text="비밀번호 변경" />
      <ModifyPassword />
    </div>
  );
}
