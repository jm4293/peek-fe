import { Wrapper } from '@/components/wrapper';

import { myAccountAction } from '@/services/user';

import NotAuth from '../NotAuth';
import ModifyUser from './ModifyUser';

export default async function ModifyUserPage() {
  const { data: myInfo } = await myAccountAction();

  if (!myInfo) {
    return <NotAuth />;
  }

  return (
    <Wrapper.MAIN text="유저정보 변경">
      <ModifyUser myInfo={myInfo} />
    </Wrapper.MAIN>
  );
}
