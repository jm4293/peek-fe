'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { Button } from '@/components/button';
import { CheckBox, EditableInput } from '@/components/input';

import { useInput } from '@/hooks/input';
import { useModal, useToast } from '@/hooks/modal';

import { ISignUpDto, signupEmailAction, useAuthMutation } from '@/services/auth';

const initialFormData: ISignUpDto = {
  nickname: '',
  name: '',
  policy: false,
  birthdate: '',
  email: '',
  password: '',
};

export default function Register() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const { openModal, closeModal } = useModal();
  const { openToast } = useToast();

  const [checkEmail, setCheckEmail] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [value, onChange] = useInput({ ...initialFormData });

  const { checkEmailMutation } = useAuthMutation();

  const handleCheckEmail = async () => {
    if (checkEmail) {
      return;
    }

    if (!value.email || !value.email.trim()) {
      openModal({ content: '이메일을 입력해주세요.', onConfirm: closeModal });
      return;
    }

    checkEmailMutation.mutate(
      { email: value.email },
      {
        onSuccess: (res) => {
          const { isExist } = res.data;

          if (isExist) {
            openModal({ content: '이미 존재하는 이메일입니다.', onConfirm: closeModal });
            return;
          }

          setCheckEmail(true);
        },
      },
    );
  };

  const handleSubmit = async () => {
    if (!checkEmail) {
      openModal({ content: '이메일 중복확인을 해주세요.', onConfirm: closeModal });
      return;
    }

    if (!value.password || !value.password.trim()) {
      openModal({ content: '비밀번호를 입력해주세요.', onConfirm: closeModal });
      return;
    }

    if (value.password !== passwordConfirm) {
      openModal({ content: '비밀번호가 일치하지 않습니다.', onConfirm: closeModal });
      return;
    }

    if (!value.nickname || !value.nickname.trim()) {
      openModal({ content: '닉네임을 입력해주세요.', onConfirm: closeModal });
      return;
    }

    if (!value.name || !value.name.trim()) {
      openModal({ content: '이름을 입력해주세요.', onConfirm: closeModal });
      return;
    }

    if (!value.policy) {
      openModal({ content: '정책에 동의해주세요.', onConfirm: closeModal });
      return;
    }

    startTransition(async () => {
      const { success } = await signupEmailAction(value);

      if (!success) {
        openToast({ type: 'error', message: '회원가입에 실패했습니다. 다시 시도해주세요.' });
        return;
      }

      openToast({ type: 'success', message: '회원가입이 완료되었습니다.' });
      router.push(`/auth/login?email=${value.email}`);
    });
  };

  return (
    <section className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-2">
          <EditableInput.EMAIL
            className="col-span-2"
            title="이메일"
            name="email"
            value={value.email}
            onChange={onChange}
            placeholder="이메일 주소"
            disabled={checkEmail}
            required
          />
          <Button.CONTAINER
            className="mt-6"
            text={checkEmail ? '이메일 확인 완료' : '이메일 중복 확인'}
            onClick={handleCheckEmail}
            disabled={checkEmail}
          />
        </div>

        <EditableInput.PASSWORD
          title="비밀번호"
          name="password"
          value={value.password}
          onChange={onChange}
          placeholder="비밀번호"
          required
        />
        <EditableInput.PASSWORD
          title="비밀번호 확인"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="비밀번호 확인"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <EditableInput.TEXT
          title="닉네임"
          name="nickname"
          value={value.nickname}
          onChange={onChange}
          placeholder="닉네임"
          required
        />
        <EditableInput.TEXT
          title="이름"
          name="name"
          value={value.name}
          onChange={onChange}
          placeholder="이름"
          required
        />
        <EditableInput.TEXT
          title="생년월일 8자리"
          name="birthdate"
          value={value.birthdate}
          onChange={onChange}
          placeholder="생년월일 8자리"
          optional
        />
      </div>

      <div className="flex justify-end">
        <CheckBox title="정책에 동의합니다" name="policy" checked={value.policy} onChange={onChange} />
      </div>

      <div className="w-full flex gap-2">
        <Button.OUTLINE
          text="뒤로가기"
          onClick={() => {
            router.push('/auth/login');
          }}
        />
        <Button.CONTAINER type="submit" text="회원가입" onClick={handleSubmit} disabled={isPending} />
      </div>
    </section>
  );
}
