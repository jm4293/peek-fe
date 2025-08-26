import { Wrapper } from '@/components/wrapper';

import { myAction } from '@/services/user';

import NotAuth from './NotAuth';
import User from './User';

export default async function UserPage() {
  const { data: my } = await myAction();

  if (!my) {
    return (
      <Wrapper.MAIN text="마이페이지">
        <NotAuth />
      </Wrapper.MAIN>
    );
  }

  return (
    <Wrapper.MAIN text="마이페이지">
      <User my={my} />
    </Wrapper.MAIN>
  );
}
