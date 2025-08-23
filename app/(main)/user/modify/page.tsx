import { Wrapper } from '@/components/wrapper';

import { myAction } from '@/services/user';

import NotAuth from '../NotAuth';
import ModifyUser from './ModifyUser';

export default async function ModifyUserPage() {
  const { data: my } = await myAction();

  if (!my) {
    return <NotAuth />;
  }

  return (
    <Wrapper.MAIN text="유저정보 변경">
      <ModifyUser my={my} />
    </Wrapper.MAIN>
  );
}
