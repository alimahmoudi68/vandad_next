"use server"

import {cookies} from 'next/headers';


const saveCookie = async (accessToken: string, refreshToken: string): Promise<void>=>{
    const currentCookies = await cookies();

    const responseCookies = currentCookies as any;

    responseCookies.set('access-token' , accessToken , {
        httpOnly : true ,
        //secure:  process.env.NODE_ENV === 'production' ?  true : false ,
        maxAge : 3600*24*30 ,
        sameSite: 'Lax', 
    });

    responseCookies.set('refresh-token' , refreshToken , {
        httpOnly : true ,
        //secure:  process.env.NODE_ENV === 'production' ? true : false ,
        maxAge : 3600*24*30 ,
        sameSite: 'Lax', 
    });

}

export default saveCookie;