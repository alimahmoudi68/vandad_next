import myFetchServer from '@/services/myFetchServer'; 

interface IUpload {
    bucket: string ,
    title: string,
    location: string
}

interface IBlog {
    id: number,
    title: string,
    slug: string,
    content: string,
    image: IUpload,
    time_study: string,
    status: string,
    author: number,
    categories: {id: number , title: string}[],
    created_at: string,
    upated_at: string,
    likedUsersCount: number
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

export const getBlog = async (p: number , q: string): Promise<IBlogResponse> => {

    return await myFetchServer(`/admin/blog?page=${p}&limit=20&&q=${q}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'GET' 
        },
    );
}


export const newBlog = async (formData: INewBlog): Promise<NewBlogResponse> => {

    return await myFetchServer('/admin/blog', {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'POST' 
        },
    );
}


export const removeBlog = async(id:number) =>{

    return await myFetchServer(`/admin/blog/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'DELETE' 
        },
    );
}


export const singleBlog = async(id:number) =>{

    return await myFetchServer(`/admin/blog/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        },
    );
}


export const updateBlog= async (id: number , formData: INewBlog): Promise<NewBlogResponse> => {


    return await myFetchServer(`/admin/blog/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'PUT' 
        },
    );
}
