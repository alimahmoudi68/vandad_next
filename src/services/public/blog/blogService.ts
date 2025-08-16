import myFetchServer from '@/services/myFetchServer'; 
import { IBlog } from "@/types/blog";

interface IUpload {
    bucket: string ,
    title: string,
    location: string
}


interface IBlogResponse {
    status: 'success' | 'error';
    blogs?: IBlog[];
    message?: string,
    pagination?:{
        page: number,
        pages: number
    }
}

interface NewBlogResponse {
    status: 'success' | 'error';
    blog?: Record<string, any>;
    message?: string,
}

interface INewBlog{
    title: string,
    slug: string,
    keywords_meta: string,
    description_meta: string,
    content: string,
    categories: number[],
    image: number
}

export const getBlog = async (p: number , limit: number , q: string , cat: string): Promise<IBlogResponse> => {

    return await myFetchServer(`/blog?page=${p}&limit=${limit}&&q=${q}&cat=${cat}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'GET' 
        },
    );
}



export const singleBlog = async(slug: string) =>{

    return await myFetchServer(`/blog/${slug}`, {
        headers: {
            "Content-Type": "application/json",
        },
        },
    );
}


