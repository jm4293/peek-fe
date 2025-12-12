import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ACCESS_TOKEN_NAME = 'TKN';
const REFRESH_TOKEN_NAME = 'RTKN';

/**
 * Refresh token으로 새로운 access token을 발급받습니다.
 */
async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: `${REFRESH_TOKEN_NAME}=${refreshToken}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // NestJS ResponseInterceptor로 래핑된 응답에서 data 추출
    const responseData = data.data || data;

    // 다양한 응답 형식 지원
    const accessToken = responseData.accessToken || responseData.tkn || responseData.access_token;

    return accessToken || null;
  } catch {
    // 토큰 갱신 실패 시 null 반환
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  const accessToken = request.cookies.get(ACCESS_TOKEN_NAME);
  const refreshToken = request.cookies.get(REFRESH_TOKEN_NAME);

  if (!refreshToken) {
    const response = NextResponse.next();
    response.cookies.delete(ACCESS_TOKEN_NAME);
    response.cookies.delete(REFRESH_TOKEN_NAME);

    return response;
  }

  if (!accessToken && refreshToken) {
    const newAccessToken = await refreshAccessToken(refreshToken.value);

    if (newAccessToken) {
      const response = NextResponse.next();
      response.cookies.set(ACCESS_TOKEN_NAME, newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 15, // 15분
        path: '/',
      });

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
