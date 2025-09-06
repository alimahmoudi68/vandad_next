import myFetchServer from '@/services/myFetchServer'; 

interface ICategory {
    id: number;
    title: string;
    slug: string;
    [key: string] : any
}

interface CategoriesResponse {
    status: 'success' | 'error';
    categories?: ICategory[];
    message?: string,
}

interface NewCategoryResponse {
    status: 'success' | 'error';
    category?: Record<string, any>;
    message?: string,
}


export const getTvCats = async (): Promise<CategoriesResponse> => {

    return await myFetchServer('/admin/tv-cats', {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'GET' 
        },
    );
}



export const newCategory = async (formData: {
    title: string ,
    slug: string,
    parent: string
}): Promise<NewCategoryResponse> => {

    return await myFetchServer('/admin/tv-cats', {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'POST' 
        },
    );
}


export const removeCategory = async(id:number) =>{

    return await myFetchServer(`/admin/tv-cats/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'DELETE' 
        },
    );
}


export const singleCategory = async(id:string) =>{

    return await myFetchServer(`/admin/tv-cats/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        },
    );
}


export const updateCategory = async (id: string , formData: {
    title: string ,
    slug: string,
}): Promise<NewCategoryResponse> => {


    return await myFetchServer(`/admin/tv-cats/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'PUT' 
        },
    );
}

