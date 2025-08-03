import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access-token')?.value

  const pathname = req.nextUrl.pathname

  // ⛔ جلوگیری از redirect شدن در /api/auth/set-cookie
  if (pathname.startsWith('/api/auth/set-cookie')) {
    return NextResponse.next()
  }

  // 🧪 اگر access-token نیست، redirect به set-cookie
  if (!accessToken) {
    const redirectUrl = new URL('/api/auth/set-cookie', req.url)
    redirectUrl.searchParams.set('callback', req.nextUrl.pathname + req.nextUrl.search)
    return NextResponse.redirect(redirectUrl)
  }

  // ادامه مسیر
  return NextResponse.next()
}

export const config = {
  //matcher: ['/admin-dashboard/:path*', '/admin-dashboard'],
  matcher: ['/xyz'],
}
