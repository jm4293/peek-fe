import { redirect } from 'next/navigation';

export async function registerUser(formData: FormData) {
  'use server';

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const passwordConfirm = formData.get('passwordConfirm') as string;
  const nickname = formData.get('nickname') as string;
  const name = formData.get('name') as string;
  const birthdate = formData.get('birthdate') as string;

  console.log('email', email);
  console.log('password', password);

  if (!email || !password || !nickname || !name) {
    alert('모든 필드를 입력해주세요.');
    return;
  }

  redirect('/auth/login');
}
