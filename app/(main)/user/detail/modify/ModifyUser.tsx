'use client';

import Link from 'next/link';
import { FormEvent } from 'react';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Wrapper } from '@/components/wrapper';

import { useModal } from '@/hooks/modal';

import { UserAccountModel, useUserMutation } from '@/services/user';

interface Props {
  userInfo: UserAccountModel;
}

export default function ModifyUser(props: Props) {
  const { userInfo } = props;

  const { openModal, closeModal } = useModal();

  const { updateUserMutation } = useUserMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nickname = formData.get('nickname');

    if (!nickname) {
      openModal({
        title: '알림',
        content: '닉네임을 입력해주세요.',
        onConfirm: closeModal,
      });
      return;
    }

    updateUserMutation.mutate({
      nickname: nickname as string,
    });
  };

  return (
    <Wrapper.SECTION>
      <form className="flex flex-col gap-16" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-8">
          <Input title="이메일" name="email" placeholder="이메일" defaultValue={userInfo.email} disabled />
          <Input title="이름" name="name" placeholder="이름" defaultValue={userInfo.user.name} disabled />
          <Input title="닉네임" name="nickname" placeholder="닉네임" defaultValue={userInfo.user.nickname} required />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link href="/user/detail">
            <Button.OUTLINE text="뒤로가기" />
          </Link>
          <Button.CONTAINER type="submit" text="변경하기" />
        </div>
      </form>
    </Wrapper.SECTION>
  );
}
