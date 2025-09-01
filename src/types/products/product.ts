import {IProductComments} from '../productComment'
import {IUpload} from "@/types/upload";

export interface IProduct {
    id: number,
    title: string,
    keywords_meta:  string,
    description_meta: string,
    slug: string,
    price: number;
    discount: boolean;
    discountPrice: number;
    content: string,
    thumbnail : IUpload,
    images: IUpload[],
    categories: 
      {
        "id": number,
        "title": string,
        "slug": string,
      }[],
    commentData: {
      comments: IProductComments[]
    }
    created_at: string,
    upated_at: string,
  }