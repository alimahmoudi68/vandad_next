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
    msg?: string,
}

interface NewCategoryResponse {
    status: 'success' | 'error';
    category?: Record<string, any>;
    msg?: string,
}

export const categories = async (): Promise<CategoriesResponse> => {

    return await myFetchServer('/admin/categories', {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'GET' 
        },
    );
}

export const childCategories = async (): Promise<CategoriesResponse> => {

    return await myFetchServer('/admin/categories/childs', {
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

    return await myFetchServer('/admin/categories', {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'POST' 
        },
    );
}


export const removeCategory = async(id:number) =>{

    return await myFetchServer(`/admin/categories/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'DELETE' 
        },
    );
}


export const singleCategory = async(id:number) =>{

    return await myFetchServer(`/admin/categories/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        },
    );
}


export const updateCategory = async (id: number , formData: {
    title: string ,
    slug: string,
    parent: string,
}): Promise<NewCategoryResponse> => {


    return await myFetchServer(`/admin/categories/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'PUT' 
        },
    );
}


