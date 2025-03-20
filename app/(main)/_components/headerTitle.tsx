'use client';

import { usePathname } from 'next/navigation';

const headerPathName: { [key: string]: string } = {
  '/home': '홈',
  '/stock': '주식',
  '/board': '게시판',
  '/board/register': '게시판 등록',
  '/board/detail': '게시판 작성',
  '/mypage': '마이페이지',
  '/mypage/board': '작성한 게시글',
  '/mypage/comment': '작성한 댓글',
  '/notification': '알림',
};

export default function HeaderTitle() {
  const pathname = usePathname();

  return <p className="text-center">{headerPathName[pathname]}</p>;
}
