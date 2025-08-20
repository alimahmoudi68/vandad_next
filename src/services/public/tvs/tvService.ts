import myFetchServer from '@/services/myFetchServer'; 
import { ITv } from "@/types/tv";


interface ITvResponse {
    status: 'success' | 'error';
    tvs?: ITv[];
    message?: string,
    pagination?:{
        page: number,
        pages: number
    }
}



export const getTvs = async (p: number , limit: number , q: string, cat: string): Promise<ITvResponse> => {

    return await myFetchServer(`/tvs?page=${p}&limit=${limit}&&q=${q}&cat=${cat}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'GET' 
        },
    );
}



export const singleTv = async(slug: string) =>{

    return await myFetchServer(`/tvs/${slug}`, {
        headers: {
            "Content-Type": "application/json",
        },
        },
    );
}


