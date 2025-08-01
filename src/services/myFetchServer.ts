"use server";

import { cookies } from "next/headers";
import saveCookie from "@/utils/common/saveCookie";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API as string;

interface RefreshTokenResponse {
  status: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

interface FetchConfig extends RequestInit {
  headers?: Record<string, string>;
}

const getRefreshToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
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
  config: FetchConfig, 
  access_token: string | false, 
  refresh_token: string | false, 
  isRetry: boolean
): Promise<any> => {
  try {

    const currentCookies = await cookies();
    let accessToken = currentCookies.get("access-token")?.value || "";
    let refreshToken = currentCookies.get("refresh-token")?.value || "";

    if (access_token) {
      accessToken = access_token;
    }
    if (refresh_token) {
      refreshToken = refresh_token;
    }


    let newConfig = {
      ...config,
      headers: {
        ...(config.headers || {}),
      },
    };
    const response = await fetch(`${BASE_URL}${url}`, { ...newConfig});


    if (response.ok){
      if(isRetry){
        saveCookie(accessToken, refreshToken);
      }

      let data = await response.json();
      return data;

    }

    if (response.status == 403) {

      let res = await getRefreshToken(refreshToken);

      if (res.status == 'success') {

        const refreshedConfig: FetchConfig = {
          ...config,
          headers: {
            ...(config.headers || {}),
            token: res.data.accessToken,
            authorization  : `bearer ${accessToken}`
          },
        };
        
        return fetchWithRetry(url , refreshedConfig , res.data.accessToken , res.data.refreshToken , true);

      }else{
        throw new Error(`Access Denied: ${response.status}`);
      }
      
    }

    let data = await response.json();
    return data;


  } catch (error) {
    throw(error)
  }
};

const fetchInterceptor = (
  url: string, 
  config: FetchConfig = {}): Promise<any> => {

  const interceptedConfig: FetchConfig = {
    ...config,
    cache: 'no-store',
    next : {revalidate : 0} ,
    headers: {
      ...config.headers,
    },
  };

  return fetchWithRetry(url, interceptedConfig , false , false , false);
};

export default fetchInterceptor;
