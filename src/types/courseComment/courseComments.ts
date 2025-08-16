import {IItemsCommentCourse} from "./IItemsCommentCourse";

export interface ICourseComments {
    comments: IItemsCommentCourse[] ,
    pagination: {
        count: 1,
        page: 1,
        limit: 10
    }
}