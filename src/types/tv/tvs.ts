import {IUpload} from "@/types/upload";
import { ITvComments } from "../tvComment";

export interface ITv {
  id: number,
  title: string,
  keywords_meta:  string,
  description_meta: string,
  slug: string,
  content: string,
  image: IUpload,
  time: string,
  status: string,
  video_url: string,
  categories: 
    {
      "id": number,
      "title": string,
      "slug": string,
    }[],
  commentData: {
    comments: ITvComments[]
  }
  created_at: string,
  upated_at: string,
}