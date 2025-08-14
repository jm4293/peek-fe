import { Text } from '@/components/text';

import { myAction } from '@/services/user';

import NotAuth from './NotAuth';
import User from './User';

export default async function UserPage() {
  const { data: my } = await myAction();

  if (!my) {
    return <NotAuth />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Text.SUBTITLE text="회원 정보" />
      <User my={my} />
    </div>
  );
}
