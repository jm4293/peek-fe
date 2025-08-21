'use client';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

import { EditableButton } from '@/components/button';
import { CheckBox, EditableInput } from '@/components/input';
import { Text } from '@/components/text';

import { useInput } from '@/hooks/input';
import { useModal, useToast } from '@/hooks/modal';

import { ISignUpDto, signupEmailAction, useAuthMutation } from '@/services/auth';

dayjs.extend(duration);

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

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

  const [checkEmail, setCheckEmail] = useState<number>(1);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [code, setCode] = useState('');
  const [count, setCount] = useState(300);

  const [value, onChange] = useInput({ ...initialFormData });

  const { checkEmailMutation, checkEmailCodeMutation } = useAuthMutation();

  const handleCheckEmail = async () => {
    if (!value.email || !value.email.trim()) {
      openModal({ content: '이메일을 입력해주세요.', onConfirm: closeModal });
      return;
    }

    if (!validateEmail(value.email)) {
      openModal({ content: '유효한 이메일 주소가 아닙니다.', onConfirm: closeModal });
      return;
    }

    checkEmailMutation.mutate(
      { email: value.email },
      {
        onSuccess: (res) => {
          const { isExist, message } = res.data;

          if (isExist) {
            openToast({ message, type: 'error' });
            return;
          }

          openToast({ message: '이메일 인증코드를 전송했습니다.', type: 'success' });
          setCheckEmail(2);
        },
      },
    );
  };

  const handleCheckCode = async () => {
    if (!code || !code.trim()) {
      openModal({ content: '인증코드를 입력해주세요.', onConfirm: closeModal });
      return;
    }

    checkEmailCodeMutation.mutate(
      { email: value.email, code },
      {
        onSuccess: (res) => {
          const { success, message } = res.data;

          if (!success) {
            openToast({ message, type: 'error' });
            return;
          }

          openToast({ message, type: 'success' });
          setCheckEmail(3);
        },
      },
    );
  };

  const handleSubmit = async () => {
    if (checkEmail !== 3) {
      openModal({ content: '이메일 인증을 완료해 주세요.', onConfirm: closeModal });
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

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (checkEmail === 2) {
      interval = setInterval(() => {
        setCount((prev) => {
          if (prev <= 1) {
            setCheckEmail(1);
            return 300;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [checkEmail]);

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
            disabled={checkEmail !== 1}
            required
          />
          <EditableButton.CONTAINER
            className="mt-6"
            text={checkEmailMutation.isPending ? '코드 전송 중' : '이메일 인증'}
            onClick={handleCheckEmail}
            disabled={checkEmailMutation.isPending || checkEmail !== 1}
          />
        </div>
        {checkEmail !== 1 && (
          <div className="grid grid-cols-3 gap-2">
            <EditableInput.TEXT
              className="col-span-2"
              title="인증코드"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="인증코드"
              minLength={4}
              maxLength={4}
              disabled={checkEmail === 3}
              required>
              <Text.PARAGRAPH text={dayjs.duration(count, 'seconds').format('m:ss')} />
            </EditableInput.TEXT>
            <EditableButton.CONTAINER
              className="mt-6"
              text={checkEmail === 3 ? '확인 완료' : '코드 확인'}
              onClick={handleCheckCode}
              disabled={checkEmail === 3}
            />
          </div>
        )}

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
        <EditableButton.OUTLINE
          text="뒤로가기"
          onClick={() => {
            router.push('/auth/login');
          }}
        />
        <EditableButton.CONTAINER type="submit" text="회원가입" onClick={handleSubmit} disabled={isPending} />
      </div>
    </section>
  );
}
