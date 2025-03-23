import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  const cookie = request.cookies.get('RT');

  const boardFilter = ['/board/list', '/board/register', '/board/modify'];

  if (boardFilter.some((path) => pathname.startsWith(path))) {
    if (!cookie && pathname !== '/board/guest') {
      return NextResponse.redirect(new URL('/board/guest', request.url));
    }
  }

  if (pathname.includes('/board/detail')) {
    if (!cookie) {
      const number = pathname.split('/').at(-1);

      return NextResponse.redirect(new URL(`/board/guest/detail/${number}`, request.url));
    }
  }

  if (pathname === '/user') {
    if (!cookie) {
      return NextResponse.redirect(new URL('/user/guest', request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
