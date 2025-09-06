import {IUpload} from "@/types/upload";

export interface IProfile{
    id: number,
    firstName: string,
    lastName:  string,
    phone: string,
    about: string,
    avatar : IUpload,
    created_at: string,
    upated_at: string,
  }