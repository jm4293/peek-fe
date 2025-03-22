import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  const cookie = request.cookies.get('RT');

  if (pathname === '/board') {
    if (!cookie) {
      return NextResponse.redirect(new URL('/board/guest', request.url));
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
