import myFetchServer from '@/services/myFetchServer'; 
import { ICourse } from "@/types/courses";



interface ICourseResponse {
    status: 'success' | 'error';
    courses?: ICourse[];
    message?: string,
    pagination?:{
        page: number,
        pages: number
    }
}

interface NewCourseResponse {
    status: 'success' | 'error';
    blog?: Record<string, any>;
    message?: string,
}

interface INewCourse{
    title: string,
    slug: string,
    keywords_meta: string,
    description_meta: string,
    content: string,
    categories: number[],
    image: number
}

export const getCourses = async (p: number , limit: number , q: string , cat: string): Promise<ICourseResponse> => {

    return await myFetchServer(`/courses?page=${p}&limit=${limit}&&q=${q}&cat=${cat}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'GET' 
        },
    );
}



export const singleCourse = async(slug: string) =>{

    return await myFetchServer(`/courses/${slug}`, {
        headers: {
            "Content-Type": "application/json",
        },
        },
    );
}


