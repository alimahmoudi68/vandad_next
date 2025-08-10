import {IUpload} from "@/types/upload";
import { IComment } from "../blogComment";

export interface IBlog {
  id: number,
  title: string,
  keywords_meta:  string,
  description_meta: string,
  slug: string,
  content: string,
  image: IUpload,
  time_study: string,
  status: string,
  author: {
    firstNam: string,
    lastName: string
  },
  categories: 
    {
      "id": number,
      "title": string,
      "slug": string,
    }[],
  commentData: {
    comments: IComment[]
  }
  created_at: string,
  upated_at: string,
  likedUsersCount: number
}