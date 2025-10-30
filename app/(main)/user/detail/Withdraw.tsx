'use client';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useModal } from '@/hooks/modal';

import { useUserMutation } from '@/services/user';

export default function UserWithdraw() {
  const { withdrawMutation } = useUserMutation();

  const { openModal, closeModal } = useModal();

  const withdrawHandler = async () => {
    if (withdrawMutation.isPending) {
      return;
    }

    openModal({
      title: '회원 탈퇴',
      content: '정말로 탈퇴하시겠습니까?',
      onConfirm: () => {
        withdrawMutation.mutate();
        closeModal();
      },
      onCancel: closeModal,
    });
  };

  return (
    <Wrapper.SECTION>
      <div className="cursor-pointer" onClick={withdrawHandler}>
        <Text.HEADING text="탈퇴하기" color="red" />
      </div>
    </Wrapper.SECTION>
  );
}
