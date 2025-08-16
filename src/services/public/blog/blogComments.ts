import myFetchServer from '@/services/myFetchServer'; 
import { IItemsCommentBlog, INewComment} from '@/types/blogComment';



interface ICommentResponse {
    status: 'success' | 'error';
    comments?: IItemsCommentBlog[];
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



export const getMoreCommentsBlog = async (id: number , p: string): Promise<ICommentResponse> => {

    return await myFetchServer(`/admin/blog?page=${p}&limit=20`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'GET' 
        },
    );
}

export const sendCommentBlog = async (formData: INewComment): Promise<INewCommentResponse> => {

    return await myFetchServer('/blog-comments', {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'POST' 
        },
    );
}
