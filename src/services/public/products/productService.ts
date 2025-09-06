import myFetchServer from '@/services/myFetchServer'; 
import { IProduct } from "@/types/products";


interface IProductResponse {
    status: 'success' | 'error';
    products?: IProduct[];
    message?: string,
    pagination?:{
        page: number,
        pages: number
    }
}



export const getProducts = async (p: number , limit: number , q: string , cat: string): Promise<IProductResponse> => {

    return await myFetchServer(`/products?page=${p}&limit=${limit}&&q=${q}&cat=${cat}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'GET' 
        },
    );
}



export const singleProduct = async(slug: string) =>{

    return await myFetchServer(`/products/${slug}`, {
        headers: {
            "Content-Type": "application/json",
        },
        },
    );
}


