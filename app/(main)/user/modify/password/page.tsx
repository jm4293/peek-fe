import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { myAccountAction } from '@/services/user';

import { UserAccountTypeEnum } from '@/shared/enum/user';

import NotAuth from '../../NotAuth';
import ModifyPassword from './ModifyPassword';

export default async function ModifyPasswordPage() {
  const { data: my } = await myAccountAction();

  if (!my) {
    return <NotAuth />;
  }

  if (my.userAccountType !== UserAccountTypeEnum.EMAIL) {
    return (
      <Wrapper.MAIN text="비밀번호 변경">
        <Wrapper.SECTION>
          <Text.HEADING text="이메일 회원만 비밀번호 변경이 가능합니다." />
        </Wrapper.SECTION>
      </Wrapper.MAIN>
    );
  }

  return (
    <Wrapper.MAIN text="비밀번호 변경">
      <ModifyPassword />
    </Wrapper.MAIN>
  );
}
