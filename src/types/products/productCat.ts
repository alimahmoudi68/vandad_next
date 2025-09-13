import { IAttribute } from "@/types/products"; 
export interface IProductCat {
  id: number,
  title: string,
  slug: string,
  children: IProductCat[] ,
  attributes?: IAttribute[]
  parent?: IProductCat
}