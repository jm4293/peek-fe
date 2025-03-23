'use server';

import utilFetch from '@/utils/fetch';

export async function GetBoardDetail(boardSeq: number) {
  const res = await utilFetch({
    path: `/board/${boardSeq}`,
    method: 'GET',
  });

  const json = await res.json();

  if (!res.ok) {
    return { result: 'FAIL', message: json.message };
  }

  return json.data;
}
