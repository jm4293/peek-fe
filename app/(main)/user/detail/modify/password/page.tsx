import { Text } from '@/components/text';
import { InternalErrorView, NotAuthView, Wrapper } from '@/components/wrapper';

import { getUserInfo } from '@/services/user';

import { ERROR_CODE } from '@/shared/constant/error-code/error-code';
import { UserAccountTypeEnum } from '@/shared/enum/user';

import ModifyPassword from './ModifyPassword';

export default async function ModifyPasswordPage() {
  const { success, data, code } = await getUserInfo();

  if (!success && code === ERROR_CODE.UNAUTHORIZED) {
    return <NotAuthView text="비밀번호 변경" />;
  }

  if (!data) {
    return (
      <Wrapper.MAIN text="비밀번호 변경">
        <InternalErrorView />
      </Wrapper.MAIN>
    );
  }

  if (data.userAccountType !== UserAccountTypeEnum.EMAIL) {
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
