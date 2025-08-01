"use server"

import { cookies } from "next/headers";

import myFetch from '@/services/myFetchUserServer'

export async function getUser(): Promise<any> {

  try {

    const cookieStore = await cookies();
    const accesstoken = cookieStore.get('access-token')?.value;
    const refreshtoken = cookieStore.get('refresh-token')?.value;


    if (!accesstoken && !refreshtoken) {
      return null;
    }

    const response = await myFetch('/users/me');

    //console.log('response', response);

    // بررسی مقدار response
    if (!response) {
      return null;
    }

 
    if (response.accessToken && response.refreshToken) {
      return {
        user: response.user ,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken
      };
    }

    if (response.user) {
      return {
        user: response.user
      };
    }

    return null;
    

    // اگر ساختار داده‌ها مطابق تایپ User نبود
    return null;


  } catch (err) {
    return null;
  }
}

export default getUser;
