'use client';

import { useAuthMutation } from '@/hooks';
import { handleInputChange } from '@/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Button from '@/components/button/button';
import Input from '@/components/input/input';
import Text from '@/components/text/text';

import { ISignUpDto } from '@/types/dto';

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

  const [checkEmail, setCheckEmail] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [formData, setFormData] = useState<ISignUpDto>(initialFormData);

  const { signUpMutation, checkEmailMutation } = useAuthMutation();

  const changeHandle = handleInputChange(setFormData);

  const handleCheckEmail = async () => {
    if (checkEmail) {
      return;
    }

    if (!formData.email || !formData.email.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }

    checkEmailMutation.mutate(
      { email: formData.email },
      {
        onSuccess: (res) => {
          const { email, isExist } = res.data;

          if (isExist) {
            alert('이미 존재하는 이메일입니다.');
            return;
          } else {
            setCheckEmail(true);
          }
        },
      },
    );
  };

  const handleSubmit = async () => {
    if (!checkEmail) {
      alert('이메일 중복확인을 해주세요.');
      return;
    }

    if (!formData.password || !formData.password.trim()) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    if (formData.password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!formData.nickname || !formData.nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    if (!formData.name || !formData.name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }

    if (!formData.policy) {
      alert('정책에 동의해주세요.');
      return;
    }

    signUpMutation.mutate(formData);
  };

  return (
    <section className="w-full flex flex-col gap-8">
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-end ">
          <Input
            type="email"
            title="이메일"
            name="email"
            value={formData.email}
            onChange={changeHandle}
            placeholder="이메일 주소"
            disabled={checkEmail}
            required>
            <Button title={checkEmail ? '완료' : '중복확인'} onClick={handleCheckEmail} disabled={checkEmail} />
          </Input>
        </div>

        <Input
          type="password"
          title="비밀번호"
          name="password"
          value={formData.password}
          onChange={changeHandle}
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

      <div className="flex flex-col gap-2">
        <Input
          type="text"
          title="닉네임"
          name="nickname"
          value={formData.nickname}
          onChange={changeHandle}
          placeholder="닉네임"
          required
        />
        <Input
          type="text"
          title="이름"
          name="name"
          value={formData.name}
          onChange={changeHandle}
          placeholder="이름"
          required
        />
        <Input
          type="text"
          title="생년월일 8자리"
          name="birthdate"
          value={formData.birthdate}
          onChange={changeHandle}
          placeholder="생년월일 8자리"
          optional
        />
      </div>

      <div className="flex justify-end items-center gap-2">
        <input
          id="policy"
          type="checkbox"
          name="policy"
          checked={formData.policy}
          onChange={(e) => setFormData({ ...formData, policy: e.target.checked })}
        />
        <label className="flex items-center gap-2" htmlFor="policy">
          <Text value="정책에 동의합니다." nowrap />
        </label>
      </div>

      <div className="flex gap-4">
        <Button style="border" title="뒤로가기" onClick={() => router.push('/auth/login')} />
        <Button type="submit" title="회원가입" onClick={handleSubmit} />
      </div>
    </section>
  );
}
