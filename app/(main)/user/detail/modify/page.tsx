import { InternalErrorView, NotAuthView, Wrapper } from '@/components/wrapper';

import { getUserInfo } from '@/services/user';

import { ERROR_CODE } from '@/shared/constant/error-code/error-code';

import ModifyUser from './ModifyUser';

export default async function ModifyUserPage() {
  const { success, data, code } = await getUserInfo();

  if (!success && code === ERROR_CODE.UNAUTHORIZED) {
    return <NotAuthView text="유저 상세" />;
  }

  if (!data) {
    return (
      <Wrapper.MAIN text="유저 상세">
        <InternalErrorView />
      </Wrapper.MAIN>
    );
  }

  return (
    <Wrapper.MAIN text="유저정보 변경">
      <ModifyUser userInfo={data} />
    </Wrapper.MAIN>
  );
}
