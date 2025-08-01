const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API as string;

export const otp = async(phone: string): Promise<Response> =>{
    try{
        return await fetch(`${BASE_URL}/auth/otp` , {
            method: "POST",
            body: JSON.stringify({phone}),
            headers: {
                "Content-Type": "application/json",
            },
        });

    }catch(err){
        throw err;
    }
}


export const verify = async(token:string , otp: string): Promise<Response> =>{
    try{
        return await fetch(`${BASE_URL}/auth/verify` , {
            method: "POST",
            body: JSON.stringify({token , otp }),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include', 
        });
    }catch(err){
        throw err;
    }
}
