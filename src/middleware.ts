import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access-token')?.value
  const refreshToken = req.cookies.get('refresh-token')?.value
  const authChecked = req.cookies.get('auth-checked')?.value

  const pathname = req.nextUrl.pathname

  // اجازه عبور برای مسیر ذخیره‌سازی کوکی‌ها
  if (pathname.startsWith('/api/auth/set-cookie')) {
    return NextResponse.next()
  }

  // اگر هیچ توکنی نداریم، به صفحه لاگین هدایت شو
  if (!accessToken && !refreshToken) {
    const loginUrl = new URL('/auth/login', req.url)
    loginUrl.searchParams.set('callback', req.nextUrl.pathname + req.nextUrl.search)
    return NextResponse.redirect(loginUrl)
  }

  // اگر access-token نداریم ولی refresh-token داریم، به روت ست‌کوکی هدایت شو تا رفرش انجام شود
  if (!accessToken && refreshToken) {
    const redirectUrl = new URL('/api/auth/set-cookie', req.url)
    redirectUrl.searchParams.set('callback', req.nextUrl.pathname + req.nextUrl.search)
    return NextResponse.redirect(redirectUrl)
  }

  // اگر access-token داریم ولی می‌خواهیم یک‌بار اعتبارسنجی/رفرش را انجام دهیم
  if (accessToken && !authChecked) {
    const redirectUrl = new URL('/api/auth/set-cookie', req.url)
    redirectUrl.searchParams.set('callback', req.nextUrl.pathname + req.nextUrl.search)
    return NextResponse.redirect(redirectUrl)
  }

  // ادامه مسیر
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/admin-dashboard',
    '/admin-dashboard/:path*',
  ],
}
