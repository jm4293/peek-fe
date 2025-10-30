'use client';

import { useDeviceLayout } from '@/hooks';
import { PencilLine } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Text } from '@/components/text';

import { useModal } from '@/hooks/modal';

import { IUserAccountModel } from '@/services/user';

interface IProps {
  userInfo: IUserAccountModel | null;
}

export const BoardRegisterButton = (props: IProps) => {
  const { userInfo } = props;
  const router = useRouter();

  const { isMobile, isPending } = useDeviceLayout();
  const { openModal, closeModal } = useModal();

  const clickHandler = () => {
    if (!userInfo) {
      openModal({
        title: '알림',
        content: (
          <div className="text-center">
            <Text.SUBTITLE text="로그인 후 이용가능한 서비스입니다." />
            <Text.SUBTITLE text="지금 로그인하고 시작하세요!" />
          </div>
        ),
        onConfirm: () => {
          closeModal();
          router.push('/auth/login');
        },
      });
      return;
    }

    router.push('/board/register');
  };

  if (isPending) {
    return null;
  }

  return (
    <div
      className="bg-theme-main-color rounded-full p-4 fixed bottom-16 right-0 -translate-x-1/2 -translate-y-1/2"
      onClick={clickHandler}>
      <PencilLine color="white" />
    </div>
  );
};
