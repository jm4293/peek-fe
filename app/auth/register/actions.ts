'use server';

import { redirect } from 'next/navigation';
import utilFetch from '@/utils/fetch';
import { ISignUpDto } from '@/types/dto';

interface IBody extends ISignUpDto {}

export async function registerUser(_: void, formData: FormData) {
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

  const { email: registeredEmail } = json.data;

  return redirect(`/auth/login?email=${registeredEmail}`);
}
