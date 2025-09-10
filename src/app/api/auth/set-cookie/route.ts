import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import getUser from "@/utils/common/getUser";

async function handleAuthRequest(request: NextRequest) {
  const callback = new URL(request.url).searchParams.get('callback') || '/';

  console.log("00")

  const getUserInfo = await getUser();

  console.log('getUserInfo' , getUserInfo)

  // 默认: بازگشت به مسیر هدف
  const response = NextResponse.redirect(new URL(callback, request.url))

  // اگر توکن‌های جدید برگشته‌اند، هر دو را ذخیره کن
  if (getUserInfo?.accessToken) {
    response.cookies.set("access-token", getUserInfo.accessToken, {
      httpOnly: true,
      maxAge: 3600 * 24 * 30,
      sameSite: "lax",
      path: "/",
    })
  }

  if (getUserInfo?.refreshToken) {
    response.cookies.set("refresh-token", getUserInfo.refreshToken, {
      httpOnly: true,
      maxAge: 3600 * 24 * 30,
      sameSite: "lax",
      path: "/",
    })
  }

  // پرهیز از حلقه: یک فلگ کوتاه‌عمر بگذار
  response.cookies.set('auth-checked', '1', {
    httpOnly: true,
    maxAge: 60, // 1 min
    sameSite: 'lax',
    path: '/',
  })

  // اگر کاربر و توکن نداریم، به صفحه لاگین هدایت شو
  if (!getUserInfo) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('callback', callback)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export async function GET(request: NextRequest) {
  return handleAuthRequest(request)
}

export async function POST(request: NextRequest) {
  return handleAuthRequest(request)
}
