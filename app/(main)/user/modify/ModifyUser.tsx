'use client';

import Link from 'next/link';
import { FormEvent } from 'react';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Wrapper } from '@/components/wrapper';

import { useModal } from '@/hooks/modal';

import { IUserAccountModel, useUserMutation } from '@/services/user';

interface IProps {
  my: IUserAccountModel;
}

export default function ModifyUser(props: IProps) {
  const { my } = props;

  const { openModal, closeModal } = useModal();

  const { updateUserMutation } = useUserMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nickname = formData.get('nickname');

    if (!nickname) {
      openModal({
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
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <Wrapper>
        <Input.TEXT title="이메일" name="email" placeholder="이메일" defaultValue={my.email} disabled />
        <Input.TEXT title="이름" name="name" placeholder="이름" defaultValue={my.user.name} disabled />
        <Input.TEXT title="닉네임" name="nickname" placeholder="닉네임" defaultValue={my.user.nickname} required />

        <div className="w-full grid grid-cols-2 gap-2">
          <Link href="/user/detail">
            <Button.OUTLINE text="뒤로가기" />
          </Link>
          <Button.CONTAINER type="submit" text="수정하기" />
        </div>
      </Wrapper>
    </form>
  );
}
