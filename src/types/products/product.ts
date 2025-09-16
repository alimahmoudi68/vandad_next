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
    },
    variants: IProductVariantsApiArr
  }

  export interface IProductAttr{
    attribute: IAttribute,
    attributeMeta: IAttributeMeta
  }

  export type IProductVariantsApi = {
    id: number;
    sku: string;
    price: number;
    stock: number;
    discountPrice: number;
    images: IUpload[];
    createdAt: string;
    updatedAt: string;
    attributes: {
      id: number;
      attribute: {
        id: number;
        title: string;
        slug: string;
        isDynamic: boolean;
      };
      attributeMeta: {
        id: number;
        title: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
      };
      value: null | string;
    }[]
  };

  export type IProductVariantsApiArr =IProductVariantsApi[]

  
  