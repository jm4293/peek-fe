'use server';

import { redirect } from 'next/navigation';
import utilFetch from '@/utils/fetch';

export async function registerUser(prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const nickname = formData.get('nickname') as string;
  const name = formData.get('name') as string;
  const birthdate = formData.get('birthdate') as string;

  const res = await utilFetch({
    path: '/auth/register-email',
    method: 'POST',
    body: { email, password, nickname, name, birthdate, policy: true },
  });

  const { email: registeredEmail } = res.data;

  redirect(`/auth/login?email=${registeredEmail}`);
}
