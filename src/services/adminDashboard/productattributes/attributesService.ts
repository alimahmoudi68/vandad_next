import myFetchServer from '@/services/myFetchServer'; 

interface IAttribute {
    _id: string;
    title: string;
    slug: string;
    [key: string] : any
}

interface AttributesResponse {
    status: 'success' | 'error';
    attributes?: IAttribute[];
    msg?: string,
}

interface NewAttributeResponse {
    status: 'success' | 'error';
    attribute?: Record<string, any>;
    msg?: string,
}

export const attributes = async (): Promise<AttributesResponse> => {

    return await myFetchServer('/admin/attributes', {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'GET' 
        },
    );
}


export const newAttribute = async (formData: {
    title: string ,
    slug: string,
    isDynamic: string | boolean
}): Promise<NewAttributeResponse> => {

    return await myFetchServer('/admin/attributes', {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'POST' 
        },
    );
}


export const removeAttributeApi = async(id:number) =>{

    return await myFetchServer(`/admin/attributes/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'DELETE' 
        },
    );
}


export const singleAttribute = async(id:string) =>{

    return await myFetchServer(`/admin/attributes/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        },
    );
}


export const updateAttribute = async (id: string , formData: {
    title: string ,
    slug: string,
    isDynamic: string | boolean
}): Promise<NewAttributeResponse> => {

    return await myFetchServer(`/admin/attributes/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'PUT' 
        },
    );
}


export const newCategoryAttribute = async ( id: string , formData: {
    name: string,
    type: string
    key: string
}): Promise<NewAttributeResponse> => {

    return await myFetchServer(`/admin/categories/add-attribute/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'POST' 
        },
    );
}