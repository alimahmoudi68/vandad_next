'use client'
import { useEffect, useState } from "react";

import ModalDeleteUpload from "@/components/modals/dashboard/modalDeleteUpload/ModalDeleteUpload";
import UploaderUnit from "@/components/common/uploader/UploaderUnit";

interface FileProps {
  config:{
    label: string,
    name: string,
    classes: string,
    isSingle: boolean,
    removeFromServer: boolean
  },
  change: (arg: { 
    type: string;
    uploadInfo?: { 
      id: string | number;
      file?: string | null; 
      uploadedId?: string | null; 
      fileUrl?: { bucketName: string; fileName: string } | null;
      errorMsg?: string;
    };
  }) => void;
  validation: any;
  errorMsg: string;
  value: Uploader[];
}

interface Uploader {
  id: number | string;
  file: File | null;
  fileUrl: { bucketName: string; fileName: string } | null;
  uploadedId: string | null;
  errorMsg: string;
}

export default function File({config , change , value , validation}: FileProps) {

  const [uploaders, setUploaders] = useState<Uploader[]>(value);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [currentUpload , setCurrentUpload] = useState<{ id: string }>({ id: '0' });

  useEffect(()=>{
    setUploaders(value);
  } , [value])

  const addUploader = () => {
    setUploaders([...uploaders, { id: new Date().getTime() , file: null , fileUrl : null , uploadedId : null , errorMsg : "" }]);
    change({
      type : "addFile" ,
      uploadInfo : { 
        id: new Date().getTime(), 
        uploadedId : null, 
        errorMsg : "" ,
        fileUrl : null
      }
    })
  };
  

  const updateUploader = (id: number | string, file: File | null) => {
    setUploaders(uploaders.map(uploader=>
      uploader.id === id ? { ...uploader, file } : uploader
    ));
  };


  const updateIdUploader = (id: number | string, uploadedId: string | null, bucketName: string, fileName: string) => {
    setUploaders(uploaders.map((uploader) =>
      uploader.id === id ? { ...uploader, uploadedId, fileUrl: { bucketName, fileName } } : uploader
    ));
  };


  const uploadHandlerHere = (id: number | string, data: { uploadedId: any; fileName: string; bucketName: string; }) => {
      const { uploadedId, bucketName, fileName } = data;
      updateIdUploader(id, uploadedId, bucketName, fileName);
      change({
        type: "uploadFile",
        uploadInfo: {
          id,
          uploadedId,
          fileUrl: {
            bucketName,
            fileName,
          },
          errorMsg: "",
        },
      });
    };


 
  const removeUploadHandler = (id: number | string)=>{
    //--- remove by id uploader , image not uploaded ---//
    let oldUploaders = [...uploaders];
    let newUploaders =  oldUploaders.filter(item=>item.id !== id);
    setUploaders(newUploaders);
    change({ type: 'removeFile', uploadInfo: { id } });
  }

  const removeUploadHandlerByidUploadedId = (id: string) => {
    //--- remove by id removeUploadHandlerByidUploadedId , remove uploaded image from server ---//
    let oldUploaders: Uploader[] = [...uploaders];
    let newUploaders: Uploader[] = [];

    //console.log(id)

    if (oldUploaders.length === 1) {
      newUploaders = oldUploaders.map((item) => {
        if (item.id === Number(id)) {
          return {
            ...item,
            file: null,
            uploadedId: null,
            fileUrl: null,
          };
        } else {
          return item;
        }
      });
    } else {
      newUploaders = oldUploaders.filter((item) => {
        if (item.id === Number(id)) {
          return false;
        } else {
          return true;
        }
      });
    }

    setUploaders(newUploaders);
    change({ type: 'removeFile', uploadInfo: { id } });
  };



  const removeUploadServerHandler = ( id : number | string) => {
    setCurrentUpload({ id: id.toString() });
    setShowModalRemove(true);
  }


  return (
    <>
      { 
        showModalRemove ?
        (
          <ModalDeleteUpload show={true} close={()=>setShowModalRemove(false)} done={removeUploadHandlerByidUploadedId} item={currentUpload} removeFromServer={config.removeFromServer}/>
        )
        :
        (
          null
        )
      }
      <div className={`${config.classes} flex flex-col items-start mb-5`}>
        {config.label !== "" ? (
            <label className="w-full text-[0.8rem] min-[500px]:text-[1rem] text-start mb-2 block">
              {config.label}
            </label>
          ) : null}
        <div  className="flex gap-5 flex flex-wrap items-center">
          {uploaders.map(({ id , uploadedId , file , fileUrl , errorMsg}) => (
              <UploaderUnit
                key={id}
                validation = {validation}
                errorMsg = {errorMsg}
                id={id}
                uploadedId = {uploadedId}
                file={file ?? null}
                fileUrl={fileUrl ?? { bucketName: '', fileName: '' }}
                onFileChange={(newFile) => updateUploader(id, newFile)}
                uploadHandler = {uploadHandlerHere}
                removeUploadHandler = {removeUploadHandler}
                removeUploadServerHandler = {removeUploadServerHandler}
              />
          ))}
          { !config.isSingle ? 
            (
              <div
              className="text-texPrimary-100 dark:text-white-100"
              onClick={addUploader}
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              + افزودن جدید
            </div>
            )
            :
            (
              null
            )
          }
        </div>  
      </div>
    </>
  );
}
