import myFetchServer from '@/services/myFetchServer'; 

interface IAttributeMeta{
    _id: string;
    title: string;
    slug: string;
    [key: string] : any
}

interface AttributesMetaResponse {
    status: 'success' | 'error';
    attributesMeta?: IAttributeMeta[];
    msg?: string,
}

interface NewAttributeResponse {
    status: 'success' | 'error';
    attribute?: Record<string, any>;
    msg?: string,
}

export const attributesMeta = async (): Promise<AttributesMetaResponse> => {

    return await myFetchServer('/admin/attributesMeta', {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'GET' 
        },
    );
}


export const newAttributeMeta = async (formData: {
    title: string ,
    slug: string,
    attribute: string
}): Promise<NewAttributeResponse> => {

    return await myFetchServer('/admin/attributesMeta/new', {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'POST' 
        },
    );
}


export const removeAttribute = async(id:string) =>{

    return await myFetchServer(`/admin/attributes/remove/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'DELETE' 
        },
    );
}


export const singleAttributeMeta = async(id:string) =>{

    return await myFetchServer(`/admin/attributesMeta/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        },
    );
}


export const updateAttributeMeta = async (id: string , formData: {
    title: string ,
    slug: string,
}): Promise<NewAttributeResponse> => {

    return await myFetchServer(`/admin/attributesMeta/${id}`, {
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