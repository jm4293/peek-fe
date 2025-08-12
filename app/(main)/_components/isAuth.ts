import { cookies } from 'next/headers';

export async function isAuth() {
  const cookieStore = await cookies();

  return !!cookieStore.get('__rt');
}
