import myFetchServer from '@/services/myFetchServer'; 
import { IItemsCommentTv, INewComment} from '@/types/tvComment';



interface ICommentResponse {
    status: 'success' | 'error';
    comments?: IItemsCommentTv[];
    message?: string,
    pagination?:{
        page: number,
        pages: number
    }
}


interface INewCommentResponse {
    status: 'success' | 'error';
    message?: string,
}



export const getMoreCommentsTv = async (id: number , p: string): Promise<ICommentResponse> => {

    return await myFetchServer(`/admin/blog?page=${p}&limit=20`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'GET' 
        },
    );
}

export const sendCommentTv = async (formData: INewComment): Promise<INewCommentResponse> => {

    return await myFetchServer('/tv-comments', {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'POST' 
        },
    );
}
