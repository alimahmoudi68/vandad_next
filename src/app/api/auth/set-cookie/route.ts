import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import getUser from "@/utils/common/getUser";


export async function GET(request: NextRequest) {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refresh-token')?.value
  const callback = new URL(request.url).searchParams.get('callback') || '/';


    const getUserInfo = await getUser();

    const response = NextResponse.redirect(new URL(callback, request.url))


    if(getUserInfo.accessToken){

        response.cookies.set("access-token", getUserInfo.accessToken, {
            httpOnly: true,
            maxAge: 3600 * 24 * 30,
            sameSite: "lax",
            path: "/",
          })

    }

  return response
}
