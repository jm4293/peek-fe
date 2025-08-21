import { Text } from '@/components/text';

import { myAction } from '@/services/user';

import NotAuth from '../NotAuth';
import ModifyUser from './ModifyUser';

export default async function ModifyUserPage() {
  const { data: my } = await myAction();

  if (!my) {
    return <NotAuth />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Text.SUBTITLE text="회원 정보 수정" />
      <ModifyUser my={my} />
    </div>
  );
}
