import myFetchServer from '@/services/myFetchServer'; 
import { IComment, INewComment} from '@/types/blogComment';



interface ICommentResponse {
    status: 'success' | 'error';
    comments?: IComment[];
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



export const getMoreComments = async (id: number , p: string): Promise<ICommentResponse> => {

    return await myFetchServer(`/admin/blog?page=${p}&limit=20`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'GET' 
        },
    );
}

export const sendComment = async (formData: INewComment): Promise<INewCommentResponse> => {

    return await myFetchServer('/blog-comments', {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'POST' 
        },
    );
}



// export const sendCommentRes = (type , id , comment , parent) =>{
//     return axiosApiInstance.post(`/comment` ,{
//         blog : type == 'blog' ? id : null ,
//         comment ,
//         parent:parent
//     });
// }
