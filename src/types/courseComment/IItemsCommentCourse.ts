export interface IItemsCommentCourse {
    id: number,
    content: string,
    accepted: boolean,
    childs: IItemsCommentCourse[],
    user: {
        firstName: string,
        lastName: string,
        phone: string
    },
    course: {
        id: number
        title: string
    },
    createdAt: string,
    updatedAt: string
}