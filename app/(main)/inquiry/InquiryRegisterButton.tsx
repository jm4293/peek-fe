'use client';

import { useDeviceLayout } from '@/hooks';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useModal } from '@/hooks/modal';

interface Props {
  isAuth: boolean;
}

export const InquiryRegisterButton = (props: Props) => {
  const { isAuth } = props;
  const router = useRouter();

  const { isMobile, isPending } = useDeviceLayout();
  const { openModal, closeModal } = useModal();

  const clickHandler = () => {
    if (!isAuth) {
      openModal({
        title: '알림',
        content: '로그인 후 이용 가능한 서비스입니다.\n 지금 로그인하고 시작하세요!',
        onConfirm: () => {
          closeModal();
          router.push('/auth/login');
        },
      });
      return;
    }

    router.push('/inquiry/register');
  };

  if (isPending) {
    return null;
  }

  return (
    <div
      className="bg-theme-main-color rounded-full p-4 fixed bottom-16 right-0 -translate-x-1/2 -translate-y-1/2"
      onClick={clickHandler}>
      <Plus color="white" />
    </div>
  );

  // return (
  //   <Link href="/user/inquiry/register">
  //     <Button.CONTAINER text="문의 등록" />
  //   </Link>
  // );
};
