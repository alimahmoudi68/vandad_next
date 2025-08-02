"use server";
import { cookies } from "next/headers";

const saveCookie = async (
  accessToken: string,
  refreshToken: string
): Promise<void> => {
  const cookieStore = await cookies();

  cookieStore.set("access-token", accessToken, {
    httpOnly: true,
    //secure:  process.env.NODE_ENV === 'production' ?  true : false ,
    maxAge: 3600 * 24 * 30,
    sameSite: "lax",
  });

  cookieStore.set("refresh-token", refreshToken, {
    httpOnly: true,
    //secure:  process.env.NODE_ENV === 'production' ? true : false ,
    maxAge: 3600 * 24 * 30,
    sameSite: "lax",
  });
};

export default saveCookie;
