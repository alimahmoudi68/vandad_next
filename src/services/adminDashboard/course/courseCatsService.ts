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


export const getCourseCats = async (): Promise<CategoriesResponse> => {

    return await myFetchServer('/admin/course-cats', {
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

    return await myFetchServer('/admin/course-cats', {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'POST' 
        },
    );
}


export const removeCategory = async(id:number) =>{

    return await myFetchServer(`/admin/course-cats/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'DELETE' 
        },
    );
}


export const singleCategory = async(id:string) =>{

    return await myFetchServer(`/admin/course-cats/${id}`, {
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


    return await myFetchServer(`/admin/course-cats/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'PUT' 
        },
    );
}

