import { cookies } from 'next/headers';

type Type = {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  header?: string;
  body?: unknown;
};

export const utilFetch = async (params: Type) => {
  const { path, method, body } = params;

  const cookieStore = await cookies();

  const cookie = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/${process.env.NEXT_PUBLIC_API_PREFIX}${path}`,
    {
      method,
      headers: { 'Content-Type': 'application/json', Cookie: cookie },
      body: body ? JSON.stringify(body) : null,
      credentials: 'include',
    },
  );
};

export default utilFetch;
