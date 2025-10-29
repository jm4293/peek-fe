import { Wrapper } from '@/components/wrapper';

import { userInfoAction } from '@/services/user';

import NotAuth from '../../NotAuth';
import ModifyUser from './ModifyUser';

export default async function ModifyUserPage() {
  const { data: userInfo } = await userInfoAction();

  if (!userInfo) {
    return <NotAuth />;
  }

  return (
    <Wrapper.MAIN text="유저정보 변경">
      <ModifyUser userInfo={userInfo} />
    </Wrapper.MAIN>
  );
}
