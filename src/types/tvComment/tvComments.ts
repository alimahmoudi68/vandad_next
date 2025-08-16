import {IItemsCommentTv} from "./IItemsCommentTv";

export interface ITvComments {
    comments: IItemsCommentTv[] ,
    pagination: {
        count: 1,
        page: 1,
        limit: 10
    }
}