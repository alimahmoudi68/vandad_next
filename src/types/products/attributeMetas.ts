
export interface IAttributeMeta {
  id?: number,
  title: string,
  slug: string,
  isDynamic: boolean | boolean,
  metas?: {
    id: number ,
    title: string,
    slug: string
  }[]
}