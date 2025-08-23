'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useToast } from '@/hooks/modal';

import { signoutAction } from '@/services/auth';

import { LocalStorage } from '@/utils/localStorage';
import { SessionStorage } from '@/utils/sessionStorage';

export default function UserLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { openToast } = useToast();

  const logoutHandler = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      const { success } = await signoutAction();

      if (!success) {
        openToast({ type: 'error', message: '로그아웃에 실패했습니다. 다시 시도해주세요.' });
        return;
      }

      queryClient.clear();
      LocalStorage.clear();
      SessionStorage.clear();
      openToast({ type: 'success', message: '로그아웃에 성공했습니다.' });
      router.push('/home');
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
