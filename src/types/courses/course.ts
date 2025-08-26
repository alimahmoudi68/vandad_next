import {IUpload} from "@/types/upload";
import { ICourseComments } from "../courseComment";
import { IEpisode } from "../episodes";

export interface ICourse {
  id: number,
  title: string,
  keywords_meta:  string,
  description_meta: string,
  slug: string,
  content: string,
  image: IUpload,
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
    comments: ICourseComments[]
  }
  episodes : IEpisode[],
  faqs: {question: string, answer: string}[]
  created_at: string,
  upated_at: string,
}