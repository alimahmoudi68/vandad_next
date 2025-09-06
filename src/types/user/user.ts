import { IUpload } from "@/types/upload";

export interface IUser {
    id?: number
    firstName : string ,
    lastName : string ,
    about: string ,
    avatar : IUpload,
  }