'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

import { GoogleOauthSvg } from '@/asset/svg';

import { Button } from '@/components/button';
import { EditableInput } from '@/components/input';

import { useInput } from '@/hooks/input';
import { useToast } from '@/hooks/modal';

import { ILoginEmailDto, signinEmailAction } from '@/services/auth';

const initialFormData: ILoginEmailDto = {
  email: '',
  password: '',
};

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const { openToast } = useToast();

  const [isError, setIsError] = useState<boolean>(false);

  const [value, onChange, init] = useInput({ ...initialFormData });

  const clickHandler = () => {
    if (!value.email || !value.password) {
      setIsError(true);
      openToast({ type: 'error', message: '이메일과 비밀번호를 입력해주세요.' });
      return;
    }

    setIsError(false);

    startTransition(async () => {
      const { success } = await signinEmailAction(value);

      if (!success) {
        openToast({ type: 'error', message: '로그인에 실패했습니다. 다시 시도해주세요.' });
        return;
      }

      openToast({ type: 'success', message: '로그인에 성공했습니다.' });
      router.push('/home');
    });
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      clickHandler();
    }
  };

  const googleLoginHandler = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL}&response_type=token&scope=openid email profile&include_granted_scopes=true`;
  };

  useEffect(() => {
    const value = searchParams.get('email');

    if (value) {
      init((prev) => ({ ...prev, email: value }));
    }
  }, []);

  return (
    <section className="flex flex-col gap-8">
      <div className="w-full flex flex-col gap-4">
        <EditableInput.EMAIL
          title="이메일"
          name="email"
          value={value.email}
          onChange={onChange}
          placeholder="이메일"
          isError={isError}
          required
        />
        <EditableInput.PASSWORD
          title="비밀번호"
          name="password"
          value={value.password}
          onChange={onChange}
          placeholder="비밀번호"
          onKeyDown={keyDownHandler}
          isError={isError}
          required
        />
      </div>

      <div className="flex flex-col items-center mt-8 gap-4">
        <Button.CONTAINER text="로그인" onClick={clickHandler} disabled={isPending} />
        <Button.OUTLINE text="회원가입" onClick={() => router.push('/auth/register')} />
      </div>

      {/*<div className="flex justify-center items-center mt-8 gap-8">*/}
      {/*  <Link href="/auth/find-id">아이디 찾기</Link>*/}
      {/*  <Link href="/auth/find-password">비밀번호 찾기</Link>*/}
      {/*</div>*/}

      <div className="flex justify-center items-center">
        <GoogleOauthSvg onClick={googleLoginHandler} />
      </div>
    </section>
  );
}
