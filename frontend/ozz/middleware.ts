// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  console.log('Middleware executed for path:', path)

  // 공개 경로 정의 (로그인이 필요 없는 경로)
  const publicPaths = ['/login']

  // 현재 경로가 공개 경로인지 확인
  const isPublicPath = publicPaths.includes(path)

  // 쿠키에서 토큰 확인 (또는 다른 인증 방식 사용)
  const token = request.cookies.get('access')?.value || ''
  console.log('Is public path:', isPublicPath)
  console.log('Token found in cookies:', token)

  // 로그인이 필요한 경로에 접근하려 하는데 토큰이 없는 경우
  if (!isPublicPath && !token) {
    console.log('Redirecting to /login due to missing token.')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 이미 로그인한 사용자가 로그인 페이지에 접근하려는 경우
  if (isPublicPath && token) {
    console.log('Redirecting to / due to existing token.')
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 그 외의 경우 요청을 그대로 진행
  return NextResponse.next()
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
