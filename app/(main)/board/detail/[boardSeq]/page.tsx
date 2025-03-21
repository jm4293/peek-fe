'use client';

async function getBoardList(params: { page: string }) {
  const { page } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/${process.env.NEXT_PUBLIC_API_PREFIX}/board?pageParam=${page}`,
    { method: 'GET' },
  );

  return await res.json();
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;

  console.log('page', page);

  const boardList = await getBoardList({ page });

  console.log('boardList', boardList);
}
