export interface IItemsCommentProduct {
    id: number,
    content: string,
    accepted: boolean,
    childs: IItemsCommentProduct[],
    user: {
        firstName: string,
        lastName: string,
        phone: string
    },
    product: {
        id: number
        title: string
    },
    createdAt: string,
    updatedAt: string
}