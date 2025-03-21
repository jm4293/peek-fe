'use client';

import { registerUser } from '@/app/auth/register/actions';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import { startTransition, useActionState, useState } from 'react';
import { useAuthMutation } from '@/hooks';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState(false);

  const [state, formAction, pending] = useActionState(registerUser, undefined);

  const { checkEmailMutation } = useAuthMutation();

  const handleCheckEmail = async () => {
    if (checkEmail) {
      return;
    }

    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    const ret = await checkEmailMutation.mutateAsync({ email });

    if (ret.data.data.isExist) {
      alert('이미 사용중인 이메일입니다.');
      return;
    } else {
      setCheckEmail(true);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const formData = new FormData(event.target as HTMLFormElement);

    if (!checkEmail) {
      alert('이메일 중복확인을 해주세요.');
      return;
    }

    const password = formData.get('password') as string;
    const passwordConfirm = formData.get('passwordConfirm') as string;

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <form className="w-full flex flex-col gap-10" onSubmit={handleSubmit}>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full grid grid-cols-6 items-center gap-2">
          <div className="col-span-4">
            <Input
              type="email"
              title="이메일"
              name="email"
              placeholder="이메일 주소"
              onChange={(event) => {
                setEmail(event.target.value);
                setCheckEmail(false);
              }}
              required
            />
          </div>
          <div className="col-span-2 mt-9">
            <Button
              type="button"
              title={checkEmail ? '완료' : '중복확인'}
              onClick={handleCheckEmail}
              disabled={checkEmail}
            />
          </div>
        </div>
        <Input type="password" title="비밀번호" name="password" placeholder="비밀번호" required />
        <Input type="password" title="비밀번호 확인" name="passwordConfirm" placeholder="비밀번호 확인" required />
      </div>

      <div className="flex flex-col gap-2">
        <Input type="text" title="닉네임" name="nickname" placeholder="닉네임" required />
        <Input type="text" title="이름" name="name" placeholder="이름" required />
        <Input type="text" title="생년월일 8자리" name="birthdate" placeholder="생년월일 8자리" optional />
      </div>

      <div className="flex flex-col gap-4">
        <Button type="submit" title="회원가입" disabled={pending} />
        <Button type="button" title="뒤로가기" onClick={() => {}} />
      </div>
    </form>
  );
}
