'use client';

import { useAuthMutation } from '@/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Button from '@/components/button/button';
import Input from '@/components/input/input';
import Text from '@/components/text/text';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessages, setErrorMessages] = useState<string | null>(null);

  const { signInMutation } = useAuthMutation();

  const clickHandler = () => {
    if (!email || !password) {
      setErrorMessages('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setErrorMessages(null);

    signInMutation.mutate({ email, password });
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const googleLoginHandler = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIEND_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL}&response_type=token&scope=openid email profile&include_granted_scopes=true`;
  };

  useEffect(() => {
    const value = searchParams.get('email');

    if (value) {
      setEmail(value);
    }
  }, []);

  return (
    <section>
      <div className="w-full flex flex-col gap-4">
        <Input
          type="email"
          title="이메일"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          required
          isError={!!errorMessages}
        />
        <Input
          type="password"
          title="비밀번호"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          onKeyDown={keyDownHandler}
          required
          isError={!!errorMessages}
        />
        {errorMessages && <Text value={errorMessages} color="red" />}
      </div>

      <div className="flex flex-col items-center mt-8 gap-8">
        <Button title="로그인" onClick={clickHandler} />
        {/*<GoogleOauthSvg onClick={() => {}} />*/}
      </div>

      <div className="flex justify-center items-center mt-8 gap-8">
        {/*<Link href="/auth/find-id">아이디 찾기</Link>*/}
        {/*<Link href="/auth/find-password">비밀번호 찾기</Link>*/}
        <Button
          style="border"
          title="회원가입"
          onClick={() => {
            router.push('/auth/register');
          }}
        />
      </div>
    </section>
  );
}
