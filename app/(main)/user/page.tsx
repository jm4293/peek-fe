import { Wrapper } from '@/components/wrapper';

import { myAction } from '@/services/user';

import NotAuth from './NotAuth';
import User from './User';

export default async function UserPage() {
  const { data: my } = await myAction();

  if (!my) {
    return (
      <Wrapper.MAIN text="MyPage">
        <NotAuth />
      </Wrapper.MAIN>
    );
  }

  return (
    <Wrapper.MAIN text="MyPage">
      <User my={my} />
    </Wrapper.MAIN>
  );
}
