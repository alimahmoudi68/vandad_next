import myFetchServer from '@/services/myFetchServer'; 

interface IUpload {
    bucket: string ,
    title: string,
    location: string
}

interface ITv {
    id: number,
    title: string,
    slug: string,
    content: string,
    image: IUpload,
    status: string,
    categories: {id: number , title: string}[],
    created_at: string,
    upated_at: string,
    time: string,
    video_url: string,
    keywords_meta: string,
    description_meta: string,
}


interface ITvResponse {
    status: 'success' | 'error';
    tvs?: ITv[];
    message?: string,
    pagination?:{
        page: number,
        pages: number
    }
}

interface NewTvResponse {
    status: 'success' | 'error';
    tv?: Record<string, any>;
    message?: string,
}

interface INewTv{
    title: string,
    slug: string,
    keywords_meta: string,
    description_meta: string,
    content: string,
    categories: number[],
    image: number,
    time: string,
    video_url: string
}

export const getTv = async (p: number , q: string): Promise<ITvResponse> => {

    return await myFetchServer(`/admin/tv?page=${p}&limit=20&&q=${q}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'GET' 
        },
    );
}


export const newTv = async (formData: INewTv): Promise<NewTvResponse> => {

    return await myFetchServer('/admin/tv', {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'POST' 
        },
    );
}


export const removeTv = async(id:number) =>{

    return await myFetchServer(`/admin/tv/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'DELETE' 
        },
    );
}


export const singleTv = async(id:number) =>{

    return await myFetchServer(`/admin/tv/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        },
    );
}


export const updateTv = async (id: number , formData: INewTv): Promise<NewTvResponse> => {


    return await myFetchServer(`/admin/tv/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'PUT' 
        },
    );
}
