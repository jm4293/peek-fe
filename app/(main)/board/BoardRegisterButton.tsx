'use client';

import { useDeviceLayout } from '@/hooks';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/button';

interface IProps {
  isAuth: boolean;
}

export const BoardRegisterButton = (props: IProps) => {
  const { isAuth } = props;

  const { isMobile } = useDeviceLayout();

  if (!isAuth) {
    return null;
  }

  if (isMobile) {
    return (
      <Link
        href="/board/register"
        className="bg-theme-main-color rounded-full p-2 fixed bottom-16 right-0 -translate-x-1/2 -translate-y-1/2">
        <Plus color="white" strokeWidth={2} />
      </Link>
    );
  }

  return (
    <Link href="/board/register">
      <Button.CONTAINER text="게시글 작성" />
    </Link>
  );
};
