'use client';

import { useEffect, useState } from 'react';
import { useAuthMutation } from '@/hooks';
import { UserAccountTypeEnum } from '@/constant/enum';

export default function Form() {
  const [accessToken, setAccessToken] = useState('');

  const { loginOauthMutation } = useAuthMutation();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');

      if (token) {
        setAccessToken(token);
      }
    };

    // 컴포넌트가 마운트될 때 해시 값을 설정
    handleHashChange();

    // 해시 값이 변경될 때마다 해시 값을 업데이트
    window.addEventListener('hashchange', handleHashChange);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (accessToken) {
      loginOauthMutation.mutate({ userAccountType: UserAccountTypeEnum.GOOGLE, access_token: accessToken });
    }
  }, [accessToken]);

  console.log('accessToken', accessToken);

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Google Login</h1>
        <p className="mt-4 text-gray-500">You are logged in with Google.</p>
      </div>
    </>
  );
}
