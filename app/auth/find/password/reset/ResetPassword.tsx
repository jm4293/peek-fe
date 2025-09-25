'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useInput } from '@/hooks/input';
import { useModal, useToast } from '@/hooks/modal';

import { useUserMutation } from '@/services/user';

import { useResetPasswordProvider } from '../EmailProvider';

const initialFormData = {
  password: '',
  confirmPassword: '',
};

export default function ResetPassword() {
  const router = useRouter();

  const { email, randomCode } = useResetPasswordProvider();

  const { openToast } = useToast();
  const { openModal, closeModal } = useModal();

  const [value, onChange] = useInput({ ...initialFormData });
  const { resetPasswordMutation } = useUserMutation();

  const handleResetPassword = () => {
    if (!value.password || !value.password.trim()) {
      openModal({ content: '비밀번호를 입력해주세요.', onConfirm: closeModal });
      return;
    }

    if (!value.confirmPassword || !value.confirmPassword.trim()) {
      openModal({ content: '비밀번호 확인을 입력해주세요.', onConfirm: closeModal });
      return;
    }

    if (value.password !== value.confirmPassword) {
      openModal({ content: '비밀번호가 일치하지 않습니다.', onConfirm: closeModal });
      return;
    }

    resetPasswordMutation.mutate({ email: email!, code: randomCode!, password: value.password });
  };

  useEffect(() => {
    if (!email || !randomCode) {
      openToast({ message: '비정상적인 접근입니다.', type: 'error' });
      router.replace('/auth/find/password', { scroll: true });
    }
  }, [email, randomCode]);

  return (
    <Wrapper.SECTION>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <Text.HEADING text={`이메일: ${email}`} />

          <Input
            type="password"
            className="w-full col-span-2"
            title="새로운 비밀번호"
            name="password"
            value={value.password}
            onChange={onChange}
            placeholder="새로운 비밀번호"
            required
          />
          <Input
            type="password"
            className="w-full col-span-2"
            title="비밀번호 확인"
            name="confirmPassword"
            value={value.confirmPassword}
            onChange={onChange}
            placeholder="비밀번호 확인"
            required
          />
        </div>

        <div className="w-full flex gap-2">
          <Link href="/auth/login" className="w-full">
            <Button.OUTLINE text="뒤로가기" />
          </Link>
          <Button.CONTAINER type="submit" text="변경하기" onClick={handleResetPassword} />
        </div>
      </div>
    </Wrapper.SECTION>
  );
}
