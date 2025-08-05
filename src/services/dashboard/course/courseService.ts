import myFetchServer from '@/services/myFetchServer'; 

interface IUpload {
    bucket: string ,
    title: string,
    location: string
}

interface ICourse {
    id: number,
    title: string,
    slug: string,
    content: string,
    image: IUpload,
    categories: {id: number , title: string}[],
    created_at: string,
    upated_at: string,
}


interface ICoursesResponse {
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
    course?: Record<string, any>;
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

export const getCourses = async (p: number , q: string): Promise<ICoursesResponse> => {

    return await myFetchServer(`/admin/courses?page=${p}&limit=20&&q=${q}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'GET' 
        },
    );
}


export const newCourse = async (formData: INewCourse): Promise<NewCourseResponse> => {

    return await myFetchServer('/admin/courses', {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'POST' 
        },
    );
}


export const removeCourse = async(id:number) =>{

    return await myFetchServer(`/admin/courses/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'DELETE' 
        },
    );
}


export const singleCourse = async(id:number) =>{

    return await myFetchServer(`/admin/courses/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        },
    );
}


export const updateCourse = async (id: number , formData: INewCourse): Promise<NewCourseResponse> => {


    return await myFetchServer(`/admin/courses/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'PUT' 
        },
    );
}
