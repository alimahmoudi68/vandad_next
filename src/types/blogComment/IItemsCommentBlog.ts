export interface IItemsCommentBlog {
    id: number,
    content: string,
    accepted: boolean,
    childs: IItemsCommentBlog[],
    user: {
        firstName: string,
        lastName: string,
        phone: string
    },
    blog: {
        id: number
        title: string
    },
    createdAt: string,
    updatedAt: string
}