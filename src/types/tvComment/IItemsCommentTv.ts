export interface IItemsCommentTv {
    id: number,
    content: string,
    accepted: boolean,
    childs: IItemsCommentTv[],
    user: {
        firstName: string,
        lastName: string,
        phone: string
    },
    tv: {
        id: number
        title: string
    },
    createdAt: string,
    updatedAt: string
}