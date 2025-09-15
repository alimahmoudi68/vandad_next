import {IProductComments} from '../productComment'
import {IUpload} from "@/types/upload";
import { IProductCat } from "@/types/products/index";
import { IAttribute } from '@/types/products/index';
import { IAttributeMeta } from '@/types/products/index';


export interface IProduct {
    id: number,
    title: string,
    keywords_meta:  string,
    description_meta: string,
    slug: string,
    price: number;
    discountPrice: number;
    thumbnail : IUpload,
    images: IUpload[],
    categories: IProductCat[],
    commentData: {
      comments: IProductComments[]
    },
    stock: number,
    sku: string,
    description: string,
    created_at: string,
    upated_at: string,
    attributes?:{
      attribute: IAttribute,
      attributeMeta: IAttributeMeta
    }
  }

  export interface IProductAttr{
    attribute: IAttribute,
    attributeMeta: IAttributeMeta
  }