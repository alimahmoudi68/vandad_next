import {IItemsCommentBlog} from "./IItemsCommentBlog";

export interface IBlogComments {
    comments: IItemsCommentBlog[] ,
    pagination: {
        count: 1,
        page: 1,
        limit: 10
    }
}