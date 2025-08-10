import {IComment} from "./comment";

export interface IBlogComments {
    comments: IComment[] ,
    pagination: {
        count: 1,
        page: 1,
        limit: 10
    }
}