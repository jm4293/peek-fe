'use server';

import { redirect } from 'next/navigation';
import utilFetch from '@/utils/fetch';
import { ISignUpDto } from '@/types/dto';

interface IBody extends ISignUpDto {}

export async function registerUser(formData: FormData) {
  const body: IBody = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    nickname: formData.get('nickname') as string,
    name: formData.get('name') as string,
    birthdate: formData.get('birthdate') as string,
    policy: true,
  };

  const res = await utilFetch({
    path: '/auth/register-email',
    method: 'POST',
    body,
  });

  const json = await res.json();

  if (!res.ok) {
    return { result: 'FAIL', message: json.message };
  }

  const { email } = json.data;

  return redirect(`/auth/login?email=${email}`);
}
