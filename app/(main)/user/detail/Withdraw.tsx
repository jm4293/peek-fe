'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useToast } from '@/hooks/modal';

import { withdrawAction } from '@/services/user';

import { LocalStorage } from '@/utils/localStorage';
import { SessionStorage } from '@/utils/sessionStorage';

export default function UserWithdraw() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { openToast } = useToast();

  const [isPending, startTransition] = useTransition();

  const withdrawHandler = async () => {
    if (isPending) {
      return;
    }

    if (confirm('정말로 탈퇴하시겠습니까?')) {
      startTransition(async () => {
        const { success } = await withdrawAction();

        if (!success) {
          openToast({ message: '탈퇴에 실패했습니다.', type: 'error' });
          return;
        }

        queryClient.clear();
        LocalStorage.clear();
        SessionStorage.clear();
        openToast({ message: '탈퇴가 완료되었습니다.', type: 'success' });
        router.push('/home');
      });
    }
  };

  return (
    <Wrapper.SECTION>
      <div className="cursor-pointer" onClick={withdrawHandler}>
        <Text.HEADING text="탈퇴하기" color="red" />
      </div>
    </Wrapper.SECTION>
  );
}
