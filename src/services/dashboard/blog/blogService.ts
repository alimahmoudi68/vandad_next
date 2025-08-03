import myFetchServer from '@/services/myFetchServer'; 

interface ICategory {
    _id: string;
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

export const categories = async (): Promise<CategoriesResponse> => {

    return await myFetchServer('/admin/categories', {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'GET' 
        },
    );
}


export const newBlog = async (formData: INewBlog): Promise<NewCategoryResponse> => {

    return await myFetchServer('/admin/blog', {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'POST' 
        },
    );
}


export const removeCategory = async(id:string) =>{

    return await myFetchServer(`/admin/categories/remove/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'DELETE' 
        },
    );
}


export const singleCategory = async(id:string) =>{

    return await myFetchServer(`/admin/categories/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        },
    );
}


export const updateCategory = async (id: string , formData: {
    title: string ,
    slug: string,
    parent: string,
    attributes: string[]
}): Promise<NewCategoryResponse> => {


    return await myFetchServer(`/admin/categories/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'POST' 
        },
    );
}


export const newCategoryAttribute = async ( id: string , formData: {
    attributes: any,
}): Promise<NewCategoryResponse> => {

    return await myFetchServer(`/admin/categories/add-attribute/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'POST' 
        },
    );
}