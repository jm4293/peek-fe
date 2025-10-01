'use client';

import Link from 'next/link';
import { FormEvent } from 'react';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Wrapper } from '@/components/wrapper';

import { useModal } from '@/hooks/modal';

import { IUserAccountModel, useUserMutation } from '@/services/user';

interface IProps {
  myInfo: IUserAccountModel;
}

export default function ModifyUser(props: IProps) {
  const { myInfo } = props;

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
      <Wrapper.SECTION>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <Input title="이메일" name="email" placeholder="이메일" defaultValue={myInfo.email} disabled />
            <Input title="이름" name="name" placeholder="이름" defaultValue={myInfo.user.name} disabled />
            <Input title="닉네임" name="nickname" placeholder="닉네임" defaultValue={myInfo.user.nickname} required />
          </div>

          <div className="w-full grid grid-cols-2 gap-2">
            <Link href="/user/detail">
              <Button.OUTLINE text="뒤로가기" />
            </Link>
            <Button.CONTAINER type="submit" text="변경하기" />
          </div>
        </div>
      </Wrapper.SECTION>
    </form>
  );
}
