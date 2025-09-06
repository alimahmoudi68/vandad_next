import myFetchServer from '@/services/myFetchServer'; 
import { IItemsCommentBlog } from '@/types/blogComment';



interface ICommentsResponse {
    status: 'success' | 'error';
    comments?: IItemsCommentBlog[];
    message?: string,
    pagination?:{
        page: number,
        pages: number
    }
}

interface ISingleCommentResponse {
    status: 'success' | 'error';
    comment?: IItemsCommentBlog;
    message?: string,
}



export const getComments = async (p: number): Promise<ICommentsResponse> => {

    return await myFetchServer(`/admin/blog-comments?page=${p}&limit=20`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'GET' 
        },
    );
}

export const singleComment = async (id: number): Promise<ISingleCommentResponse> => {

    return await myFetchServer(`/admin/blog-comments/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'GET' 
        },
    );
}

export const updateComment = async (id: number , formData : {content : string}): Promise<ICommentsResponse> => {

    return await myFetchServer(`/admin/blog-comments/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'PUT' 
        },
    );
}

export const acceptComment = async (id: number): Promise<ICommentsResponse> => {

    return await myFetchServer(`/admin/blog-comments/accept/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'PUT' 
        },
    );
}

export const rejectComment = async (id: number): Promise<ICommentsResponse> => {

    return await myFetchServer(`/admin/blog-comments/reject/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'PUT' 
        },
    );
}

export const removeComment = async(id:number) =>{

    return await myFetchServer(`/admin/blog-comments/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'DELETE' 
        },
    );
}



