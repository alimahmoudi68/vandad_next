import {IItemsCommentProduct} from "./IItemsCommentProduct";

export interface IProductComments {
    comments: IItemsCommentProduct[] ,
    pagination: {
        count: 1,
        page: 1,
        limit: 10
    }
}