import myFetchServer from '@/services/myFetchServer'; 
import { IItemsCommentCourse, INewComment} from '@/types/courseComment';



interface ICommentResponse {
    status: 'success' | 'error';
    comments?: IItemsCommentCourse[];
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



export const getMoreCommentsCourse = async (id: number , p: string): Promise<ICommentResponse> => {

    return await myFetchServer(`/blog?page=${p}&limit=20`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'GET' 
        },
    );
}

export const sendCommentCourse = async (formData: INewComment): Promise<INewCommentResponse> => {

    return await myFetchServer('/course-comments', {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'POST' 
        },
    );
}
