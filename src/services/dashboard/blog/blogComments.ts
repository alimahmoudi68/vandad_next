import myFetchServer from '@/services/myFetchServer'; 


interface IComment {
    id: number,
    title: string,
    slug: string,
    content: string,
    time_study: string,
    status: string,
    author: number,
    categories: {id: number , title: string}[],
    created_at: string,
    upated_at: string,
    likedUsersCount: number
}


interface ICommentResponse {
    status: 'success' | 'error';
    comments?: IComment[];
    message?: string,
    pagination?:{
        page: number,
        pages: number
    }
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



// export const sendComment = (type , id , comment) =>{
//     return axiosApiInstance.post(`/comment` ,{
//         blog : type == 'blog' ? id : null ,
//         comment 
//     });
// }

// export const sendCommentRes = (type , id , comment , parent) =>{
//     return axiosApiInstance.post(`/comment` ,{
//         blog : type == 'blog' ? id : null ,
//         comment ,
//         parent:parent
//     });
// }
