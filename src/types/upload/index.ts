export interface IUpload {
  id?: number
  bucket: string,
  location: string,
  uploadedId?: number,
  fileUrl? : {
    bucketName: string,
    fileName: string
  }
}