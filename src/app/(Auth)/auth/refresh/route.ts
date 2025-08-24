
export async function GET() {
  try {
    console.log("da");

  } catch (err) {
    throw err;
  }
}


// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   const cookieStore = await cookies();
//   const refreshToken = cookieStore.get("refresh-token")?.value;

//   console.log("refreshToken====+", refreshToken);

//   // if (!refreshToken) {
//   //   return NextResponse.redirect(new URL('/login', request.url))
//   // }

//   try {
//     const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;
//     const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: `bearer ${refreshToken}`,
//       },
//     });
//     const data = await res.json();
//     console.log("da", data);

//     // Always redirect to admin-dashboard after refresh
//     const response = NextResponse.redirect(
//       new URL("/admin-dashboard", request.url)
//     );

//     response.cookies.set("access-token", data.accessToken, {
//       httpOnly: true,
//       //secure:  process.env.NODE_ENV === 'production' ?  true : false ,
//       maxAge: 3600 * 24 * 30,
//       sameSite: "lax",
//       path: "/",
//     });

//     return response;
//   } catch (err) {
//     throw err;
//   }
// }
