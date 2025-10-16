'use client';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useInput } from '@/hooks/input';
import { useModal, useToast } from '@/hooks/modal';

import { useUserMutation } from '@/services/user';

import { useResetPasswordProvider } from './EmailProvider';

dayjs.extend(duration);

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const initialFormData = {
  email: '',
};

export default function VerifyEmail() {
  const router = useRouter();

  const { setEmail, setRandomCode } = useResetPasswordProvider();

  const { openModal, closeModal } = useModal();
  const { openToast } = useToast();

  const [checkEmail, setCheckEmail] = useState<number>(1);
  const [code, setCode] = useState('');
  const [count, setCount] = useState(300);

  const [value, onChange] = useInput({ ...initialFormData });

  const { checkEmailMutation, checkEmailCodeMutation } = useUserMutation();

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
        onError: (err: any) => {
          const { message } = err.response.data;
          openToast({ message, type: 'error' });
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
          const { success, message, code } = res.data;

          setRandomCode(code);
          setCheckEmail(3);
        },
        onError: (err: any) => {
          const { message } = err.response.data;
          openToast({ message, type: 'error' });
        },
      },
    );
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
      <Text.HEADING text="회원정보 확인" />

      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <Input
            type="email"
            className="w-full col-span-2"
            title="이메일"
            name="email"
            value={value.email}
            onChange={onChange}
            placeholder="이메일 주소"
            disabled={checkEmail !== 1}
            required>
            <div className="cursor-pointer" onClick={handleCheckEmail}>
              <Text.HEADING
                text={checkEmailMutation.isPending ? '전송 중' : '인증'}
                color={`${checkEmailMutation.isPending ? 'gray' : 'blue'}`}
              />
            </div>
          </Input>

          {checkEmail !== 1 && (
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
              <div className="flex items-center gap-2">
                {checkEmail !== 3 && <Text.CAPTION text={dayjs.duration(count, 'seconds').format('m:ss')} />}
                <div className="cursor-pointer" onClick={handleCheckCode}>
                  <Text.HEADING
                    text={checkEmail === 3 ? '완료' : checkEmailCodeMutation.isPending ? '확인 중' : '확인'}
                    color={checkEmail === 3 ? 'gray' : 'blue'}
                  />
                </div>
              </div>
            </Input>
          )}
        </div>

        <div className="w-full flex gap-2">
          <Link href="/auth/login" className="w-full">
            <Button.OUTLINE text="뒤로가기" />
          </Link>
          <Button.CONTAINER
            type="submit"
            text="다음"
            onClick={() => {
              setEmail(value.email);
              router.push('/auth/find/password/reset', { scroll: true });
            }}
            disabled={checkEmail !== 3}
          />
        </div>
      </div>
    </Wrapper.SECTION>
  );
}
