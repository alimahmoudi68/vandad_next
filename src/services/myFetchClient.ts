import saveCookie from "@/utils/common/saveCookie";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

interface RefreshTokenResponse {
  status: string;
  accessToken: string;
  refreshToken: string;
}

interface FetchConfig extends RequestInit {
  headers?: Record<string, string>;
}

const getRefreshToken = async (): Promise<RefreshTokenResponse>  => {
  try {
    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      cache: "no-store",
      next : {revalidate : 0} ,
      credentials: "include" ,
      headers: {
        "Content-Type": "application/json",
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
  isRetry: boolean
): Promise<any> => {
  try {

    const response = await fetch(`${BASE_URL}${url}`, { ...config});

    let data = await response.json();
    console.log('data>---' , data) 
    
    if (response.ok){
      let data = await response.json();
      return data;
    }

    if (response.status == 403) {
      let res = await getRefreshToken();

      console.log('refresh token---' , res) 


      if (res.status == 'success') {

        saveCookie(res.accessToken , res.refreshToken);

        const newConfig: FetchConfig = {
          ...config,
          headers: {
            ...(config.headers || {}),
            token: res.accessToken,
          },
        };

        return fetchWithRetry(url , newConfig  , true);

      } else {
        let data = await response.json();
        throw new Error(data.msg);
      }
    } else {
      let data = await response.json();
      throw new Error(data.msg);
    }

  } catch (error) {
    throw(error)
  }
};

const fetchInterceptor = (
  url: string, 
  config: FetchConfig = {}
): Promise<any> => {
  
  const interceptedConfig: FetchConfig = {
    cache: "no-store",
    next : {revalidate : 0} ,
    credentials: "include" ,
    ...config,
    headers: {
      ...(config.headers || {}),
    },
  };

  return fetchWithRetry(url, interceptedConfig, false);
};

export default fetchInterceptor;
