'use client';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useModal } from '@/hooks/modal';

import { useAuthMutation } from '@/services/auth';

export default function UserLogout() {
  const { signoutMutation } = useAuthMutation();

  const { openModal, closeModal } = useModal();

  const logoutHandler = async () => {
    if (signoutMutation.isPending) {
      return;
    }

    openModal({
      title: '알림',
      content: '로그아웃 하시겠습니까?',
      onConfirm: () => {
        closeModal();
        signoutMutation.mutate();
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  return (
    <Wrapper.SECTION>
      <div className="cursor-pointer" onClick={logoutHandler}>
        <Text.HEADING text="로그아웃" color="red" />
      </div>
    </Wrapper.SECTION>
  );
}
