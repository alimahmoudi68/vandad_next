import { cookies } from 'next/headers';


export async function POST() {

    try{

        const cookieStore = await cookies();
        cookieStore.delete('access-token');
        cookieStore.delete('refresh-token');

        return new Response(JSON.stringify({ status: 'success' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });


    }catch(err){
        console.log(err);
        return new Response(JSON.stringify({ status: 'error', message: 'Failed to remove cookies' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
   
}