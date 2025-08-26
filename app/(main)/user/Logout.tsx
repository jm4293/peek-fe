'use client';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useAuthMutation } from '@/services/auth';

export default function UserLogout() {
  const { signoutMutation } = useAuthMutation();

  const logoutHandler = async () => {
    if (signoutMutation.isPending) {
      return;
    }

    if (confirm('로그아웃 하시겠습니까?')) {
      signoutMutation.mutate();
    }
  };

  return (
    <Wrapper.SECTION>
      <div className="cursor-pointer" onClick={logoutHandler}>
        <Text.HEADING text="로그아웃" color="red" />
      </div>
    </Wrapper.SECTION>
  );
}
