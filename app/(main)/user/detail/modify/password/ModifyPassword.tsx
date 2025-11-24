'use client';

import Link from 'next/link';
import { FormEvent } from 'react';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Wrapper } from '@/components/wrapper';

import { useModal } from '@/hooks/modal';

import { useUserMutation } from '@/services/user';

export default function ModifyPassword() {
  const { openModal, closeModal } = useModal();

  const { updatePasswordMutation } = useUserMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');

    if (!currentPassword) {
      openModal({
        title: '알림',
        content: '현재 비밀번호를 입력해주세요.',
        onConfirm: closeModal,
      });
      return;
    }

    if (!newPassword) {
      openModal({
        title: '알림',
        content: '새 비밀번호를 입력해주세요.',
        onConfirm: closeModal,
      });
      return;
    }

    if (!confirmPassword) {
      openModal({
        title: '알림',
        content: '비밀번호 확인을 입력해주세요.',
        onConfirm: closeModal,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      openModal({
        title: '알림',
        content: '변경할 비밀번호와 확인 비밀번호가 일치하지 않습니다.',
        onConfirm: closeModal,
      });
      return;
    }

    updatePasswordMutation.mutate({
      password: currentPassword as string,
      newPassword: newPassword as string,
    });
  };

  return (
    <Wrapper.SECTION>
      <form className="flex flex-col gap-16" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-8">
          <Input label="현재 비밀번호" name="currentPassword" placeholder="현재 비밀번호" />
          <Input label="새 비밀번호" name="newPassword" placeholder="새 비밀번호" />
          <Input label="비밀번호 확인" name="confirmPassword" placeholder="비밀번호 확인" />
        </div>

        <div className="w-full grid grid-cols-2 gap-2">
          <Link href="/user/detail">
            <Button.OUTLINE text="뒤로가기" />
          </Link>
          <Button.CONTAINER type="submit" text="변경하기" />
        </div>
      </form>
    </Wrapper.SECTION>
  );
}
