'use client';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useUserMutation } from '@/services/user';

export default function UserWithdraw() {
  const { withdrawMutation } = useUserMutation();

  const withdrawHandler = async () => {
    if (withdrawMutation.isPending) {
      return;
    }

    if (confirm('정말로 탈퇴하시겠습니까?')) {
      withdrawMutation.mutate();
    }
  };

  return (
    <Wrapper.SECTION>
      <div className="cursor-pointer" onClick={withdrawHandler}>
        <Text.HEADING text={`${withdrawMutation.isPending ? '탈퇴중...' : '탈퇴하기'}`} color="red" />
      </div>
    </Wrapper.SECTION>
  );
}
