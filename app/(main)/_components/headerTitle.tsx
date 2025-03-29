'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

// const headerPathName: { [key: string]: string } = {
//   '/home': '홈',
//   '/home/guest': '홈',
//   '/stock': '주식',
//   '/stock/guest': '주식',
//   '/board': '게시판',
//   '/board/guest': '게시판',
//   '/board/register': '게시판 등록',
//   '/board/detail': '게시판 작성',
//   '/user': '내 정보',
//   '/user/guest': '내 정보',
//   '/user/board': '작성한 게시글',
//   '/user/comment': '작성한 댓글',
//   '/notification': '알림',
// };

const headerPathName: { [key: string]: string } = {
  home: '홈',
  stock: '주식',
  board: '게시판',
  user: '내 정보',
  notification: '알림',
};

export default function HeaderTitle() {
  const pathname = usePathname();

  const title = useMemo(() => {
    const path = pathname.split('/')[1];

    return headerPathName[path];
  }, [pathname]);

  return <p className="text-center">{title}</p>;
}
