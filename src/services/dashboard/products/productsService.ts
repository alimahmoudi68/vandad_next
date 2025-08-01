
import myFetchServer from '@/services/myFetchServer'; 


import type {INewProductApi , NewProductResponse} from '@/types/dashboard/products'


interface IProduct {
    _id: string;
    title: string;
    slug: string;
    price: number;
    [key: string] : any
}


interface ProductsResponse {
    status: 'success' | 'error';
    products?: {
        data: IProduct[]
    };
    pagination: {
        currentPage: number,
        totalPages: number,
        totalProducts: number,
    },
    msg?: string,
}



export const products = async (): Promise<ProductsResponse> => {

    return await myFetchServer('/admin/products', {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'GET' 
        },
    );
}


export const newProduct = async (productData: INewProductApi): Promise<NewProductResponse> => {
    return await myFetchServer('/admin/products/new', {
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
        method: 'POST',
    });
};


export const editProduct = async (id : string , productData: INewProductApi): Promise<NewProductResponse> => {

    return await myFetchServer(`/admin/products/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(productData),
        method : 'PUT' 
        },
    );
}

export const singleProduct = async(id:string) =>{

    return await myFetchServer(`/admin/products/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        },
    );
}


export const removeProduct = async(id:string) =>{

    return await myFetchServer(`/admin/products/remove/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'DELETE' 
        },
    );
}
