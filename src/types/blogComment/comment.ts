export interface IComment {
    id: number,
    content: string,
    accepted: boolean,
    childs: IComment[],
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