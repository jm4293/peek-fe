import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  const cookie = request.cookies.get('__rt');

  // if (pathname === '/home') {
  //   if (!cookie) {
  //     return NextResponse.redirect(new URL('/home/guest', request.url));
  //   }
  // }

  // if (pathname === '/stock') {
  //   if (!cookie) {
  //     return NextResponse.redirect(new URL('/stock/guest', request.url));
  //   }
  // }

  // if (pathname.includes('/board') && !pathname.includes('/board/guest') && !pathname.includes('/board/detail')) {
  //   if (!cookie) {
  //     return NextResponse.redirect(new URL(`/board/guest`, request.url));
  //   }
  // }

  // if (pathname.includes('/board/detail')) {
  //   if (!cookie) {
  //     const number = pathname.split('/').at(-1);
  //
  //     return NextResponse.redirect(new URL(`/board/guest/detail/${number}`, request.url));
  //   }
  // }

  // const boardFilter = ['/board/register', '/board/modify'];
  //
  // if (boardFilter.some((path) => pathname.startsWith(path))) {
  //   if (!cookie) {
  //     return NextResponse.redirect(new URL('/board/guest', request.url));
  //   }
  // }

  // if (pathname === '/board') {
  //   if (!cookie) {
  //     return NextResponse.redirect(new URL('/board/guest', request.url));
  //   }
  // }

  if (pathname === '/user') {
    if (!cookie) {
      return NextResponse.redirect(new URL('/guest', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
