import myFetchServer from '@/services/myFetchServer'; 

import { IAttributeMeta } from "@/types/attributeMetas";

interface AttributesMetaResponse {
    status: 'success' | 'error';
    attributeMetas?: IAttributeMeta[];
    msg?: string,
}

interface NewAttributeResponse {
    status: 'success' | 'error';
    attribute?: Record<string, any>;
    msg?: string,
}

export const attributesMetas = async (): Promise<AttributesMetaResponse> => {

    return await myFetchServer('/admin/attribute-metas', {
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
    attribute: number
}): Promise<NewAttributeResponse> => {

    return await myFetchServer('/admin/attribute-metas', {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'POST' 
        },
    );
}


export const removeAttribute = async(id:string) =>{

    return await myFetchServer(`/admin/attribute-metas/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'DELETE' 
        },
    );
}


export const singleAttributeMeta = async(id:string) =>{

    return await myFetchServer(`/admin/attribute-metas/${id}`, {
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

    return await myFetchServer(`/admin/attribute-metas/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'PUT' 
        },
    );
}


