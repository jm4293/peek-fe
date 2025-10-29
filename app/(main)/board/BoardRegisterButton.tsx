'use client';

import { useDeviceLayout } from '@/hooks';
import { PencilLine } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
