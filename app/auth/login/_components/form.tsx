'use client';

import Input from '@/components/input/input';
import { CheckBoxSvg } from '@/asset/svg';
import Text from '@/components/text/text';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import Button from '@/components/button/button';
import { loginEmail } from '@/app/auth/login/action';
import { ResCodeEnum } from '@/constant/enum';
import { useAuthMutation } from '@/hooks';

export default function Form() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string>('');

  const { registerMessagingTokenMutation } = useAuthMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setErrorMessages('');

    const formData = new FormData(event.target as HTMLFormElement);

    startTransition(async () => {
      const ret = await loginEmail(formData);

      if (ret.result === ResCodeEnum.SUCCESS) {
        //   if (Notification.permission === 'granted') {
        //     const token = await requestForToken();
        //
        //     if (token) {
        //       await registerMessagingTokenMutation.mutateAsync(token);
        //     }
        //   }
        //
        router.push('/user');
      }

      if (ret.result === ResCodeEnum.FAIL) {
        const { message } = ret;

        setErrorMessages(message);
      }
    });
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();

      event.currentTarget.form?.requestSubmit();
    }
  };

  const googleLoginHandler = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIEND_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL}&response_type=token&scope=openid email profile&include_granted_scopes=true`;
  };

  useEffect(() => {
    if (searchParams) {
      const email = searchParams.get('email');

      if (email) {
        const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
        emailInput.value = email;
      }
    }
  }, [searchParams]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full flex flex-col gap-4 mb-16">
        <Input type="email" title="이메일" name="email" placeholder="이메일" required />
        <Input
          type="password"
          title="비밀번호"
          name="password"
          placeholder="비밀번호"
          onKeyDown={keyDownHandler}
          required
        />
        {errorMessages && <Text value={errorMessages} color="#F87171" />}
      </div>

      <div className="flex flex-col gap-2 mb-8">
        <Button title="로그인" type="submit" disabled={isPending} />
      </div>

      <div className="flex justify-between flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-1.5">
          <CheckBoxSvg isCheck={isAutoLogin} onClick={() => setIsAutoLogin(!isAutoLogin)} />
          <Text value="자동로그인" color="#000000" onClick={() => {}} />
        </div>

        <div className="flex items-center gap-3">
          <Text value="아이디 찾기" color="#000000" onClick={() => {}} />
          <div className="w-[1px] h-2/3 bg-[#B5B5B5]" />
          <Text value="비밀번호 찾기" color="#000000" onClick={() => {}} />
          <div className="w-[1px] h-2/3 bg-[#B5B5B5]" />
          <Text value="회원가입" color="#000000" onClick={() => router.push('/auth/register')} />
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-8">
        <Button title="구글 로그인" type="button" onClick={googleLoginHandler} />
      </div>
    </form>
  );
}
