'use client';

import { ValidationUtil } from '@/utils';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

import { Button } from '@/components/button';
import { CheckBox, Input } from '@/components/input';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

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

  const [value, onChange] = useInput<ISignUpDto>({ ...initialFormData });

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
    const isValid = ValidationUtil.create()
      .required(value.email, '이메일을 입력해주세요.')
      .email(value.email, '유효한 이메일 주소가 아닙니다.')
      .custom(() => checkEmail === 3, '이메일 인증을 완료해 주세요.')
      .required(value.password, '비밀번호를 입력해주세요.')
      .minLength(value.password, 6, '비밀번호는 최소 6글자 이상이어야 합니다')
      .custom(() => value.password === passwordConfirm, '비밀번호가 일치하지 않습니다.')
      .required(value.nickname, '닉네임을 입력해주세요.')
      .required(value.name, '이름을 입력해주세요.')
      .custom(() => value.policy, '정책에 동의해주세요.')
      .validate((errorMessage) => {
        openModal({ content: errorMessage, onConfirm: closeModal });
      });

    if (!isValid) {
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
        setCount(300);
        clearInterval(interval);
      }
    };
  }, [checkEmail]);

  return (
    <Wrapper.SECTION>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-2">
            <Input
              type="email"
              className="w-full col-span-2"
              title="이메일"
              name="email"
              value={value.email}
              onChange={onChange}
              placeholder="이메일 주소"
              disabled={checkEmail !== 1}
              required
            />
            <Button.CONTAINER
              className="mt-6"
              text={checkEmailMutation.isPending ? '코드 전송 중' : '이메일 인증'}
              onClick={handleCheckEmail}
              disabled={checkEmailMutation.isPending || checkEmail !== 1}
            />
          </div>
          {checkEmail !== 1 && (
            <div className="grid grid-cols-3 gap-2">
              <Input
                type="number"
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
              </Input>
              <Button.CONTAINER
                className="mt-6"
                text={checkEmail === 3 ? '확인 완료' : '코드 확인'}
                onClick={handleCheckCode}
                disabled={checkEmail === 3}
              />
            </div>
          )}

          <Input
            type="password"
            title="비밀번호"
            name="password"
            value={value.password}
            onChange={onChange}
            placeholder="비밀번호"
            required
          />
          <Input
            type="password"
            title="비밀번호 확인"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="비밀번호 확인"
            required
          />
        </div>

        <div className="flex flex-col gap-4">
          <Input
            title="닉네임"
            name="nickname"
            value={value.nickname}
            onChange={onChange}
            placeholder="닉네임"
            required
          />
          <Input title="이름" name="name" value={value.name} onChange={onChange} placeholder="이름" required />
          {/* <Input
          title="생년월일 8자리"
          name="birthdate"
          value={value.birthdate}
          onChange={onChange}
          placeholder="생년월일 8자리"
          optional
        /> */}

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
            <Button.CONTAINER text="회원가입" onClick={handleSubmit} disabled={isPending} />
          </div>
        </div>
      </div>
    </Wrapper.SECTION>
  );
}
