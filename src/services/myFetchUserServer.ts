"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

interface RefreshTokenResponse {
  status: string;
  accessToken: string;
  refreshToken: string;
}

interface UserData {
    user: any; 
}

interface FetchResponse {
    saveToken: boolean;
    user: UserData;
    accessToken?: string;
    refreshToken?: string;
}

const getRefreshToken = async (refreshToken : string): Promise<RefreshTokenResponse | null> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization : `bearer ${refreshToken}`
      },
    });

    return await response.json();
    
  } catch (err) {
    throw err;
  }
};

const fetchWithRetry = async (
    url: string, 
    config: any, 
    access_token: string, 
    refresh_token: string, 
    isRetry: boolean
): Promise<FetchResponse | undefined | null> => {

  try {

    const currentCookies = await cookies();

    let accessToken = currentCookies.get("access-token")?.value || '';
    let refreshToken = currentCookies.get("refresh-token")?.value || '';

    if (access_token !== '') {
      accessToken = access_token;
    }
    if (refresh_token !== '') {
      refreshToken = refresh_token;
    }

    let newConfig = {...config};
    newConfig.headers.authorization =  `bearer ${accessToken}`;

    const response = await fetch(`${BASE_URL}${url}`, { ...newConfig});

    if (response.ok){
      let data = await response.json();

      if(isRetry){
        return {
          saveToken : isRetry,
          user : data.user,
          accessToken,
          refreshToken,
        };

      }else{
        return {
          saveToken : isRetry,
          user : data.user,
        };
      }
    }

    if (response.status === 403 && !isRetry) {
      let res = await getRefreshToken(refreshToken);

      console.log('res' , res)

      if (res && res.status == 'success') {
        let newConfig = {...config};
        return await fetchWithRetry(url , newConfig , res.accessToken , res.refreshToken , true);

      } else {
        return null;
      }
    }
  } catch (error) {
    return null
  }

};

const fetchInterceptor = (url: string , config: RequestInit ={} ) => {

  const interceptedConfig = {
    ...config,
    cache: 'no-store',
    next : {revalidate : 0} ,
    headers: {
      ...config.headers,
    },
  };

  return fetchWithRetry(url, interceptedConfig , '', '' , false);
};

export default fetchInterceptor;