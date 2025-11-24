'use client';

import { useDeviceLayout, useFooterVisibility } from '@/hooks';
import { PencilLine } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Text } from '@/components/text';

import { useModal } from '@/hooks/modal';

import { UserAccountModel } from '@/services/user';

interface Props {
  userInfo: UserAccountModel | null;
}

export const BoardRegisterButton = (props: Props) => {
  const { userInfo } = props;
  const router = useRouter();

  const { isMobile, isPending } = useDeviceLayout();
  const { openModal, closeModal } = useModal();
  const { isVisible: isFooterVisible } = useFooterVisibility();

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

  const bottomValue = isMobile && !isFooterVisible ? '0rem' : '4rem';

  return (
    <div
      className="bg-theme-main-color rounded-full p-4 fixed -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out"
      style={{
        right: 'max(0rem, calc((100vw - min(100vw, 2345px)) / 2))',
        bottom: bottomValue,
      }}
      onClick={clickHandler}>
      <PencilLine color="white" />
    </div>
  );
};
