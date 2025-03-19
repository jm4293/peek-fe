'use client';

import { Input } from '@/components/input';
import { useState } from 'react';
import { Button } from '@/components/button';
import { CheckBoxSvg } from '@/asset/svg';
import { Text } from '@/components/text';
import { useAuthMutation } from '@/hooks';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAutoLogin, setIsAutoLogin] = useState(false);

  const { onLoginEmailMutation } = useAuthMutation();

  const onLoginHandler = () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    onLoginEmailMutation.mutate({ email, password });
  };

  const onKeyDownHandler = () => {
    onLoginHandler();
  };

  return (
    <div>
      <div className="w-full flex flex-col gap-4 mb-16">
        <Input
          type="email"
          title="이메일"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="이메일 주소"
        />
        <Input
          type="password"
          title="비밀번호"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="비밀번호"
          onKeyDown={onKeyDownHandler}
        />
      </div>

      <div className="mb-7">
        <Button text="로그인" onClick={onLoginHandler} />
      </div>

      <div className="flex justify-between">
        <div className="flex items-center gap-1.5">
          <CheckBoxSvg isCheck={isAutoLogin} onClick={() => setIsAutoLogin(!isAutoLogin)} />
          <Text value="자동로그인" color="#000000" onClick={() => {}} />
        </div>

        <div className="flex items-center gap-3">
          <Text value="아이디 찾기" color="#000000" onClick={() => {}} />
          <div className="w-[1px] h-2/3 bg-[#B5B5B5]" />
          <Text value="비밀번호 찾기" color="#000000" onClick={() => {}} />
          <div className="w-[1px] h-2/3 bg-[#B5B5B5]" />
          <Text value="회원가입" color="#000000" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}
