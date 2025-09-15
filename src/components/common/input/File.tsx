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
    removeFromServer: boolean,
    inSidebar: boolean,
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
  id: number;
  file: File | null;
  fileUrl: { bucketName: string; fileName: string } | null;
  uploadedId: string | null;
  errorMsg: string;
  temp?: boolean; // فیلد جدید برای نشان دادن فایل موقت
}

export default function File({config , change , value , validation}: FileProps) {

  const [uploaders, setUploaders] = useState<Uploader[]>(value);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [currentUpload , setCurrentUpload] = useState<{ id: number , uploadedId: number }>({id:0 , uploadedId : 0});

  useEffect(()=>{
    setUploaders(value);
  } , [value]);


  const addUploader = () => {
    // همیشه اجازه اضافه کردن باکس جدید را می‌دهیم
    const newId = new Date().getTime();
    setUploaders(prevUploaders => [...prevUploaders, { 
      id: newId, 
      file: null, 
      fileUrl: null, 
      uploadedId: null, 
      errorMsg: "", 
      temp: false 
    }]);
    change({
      type : "addFile" ,
      uploadInfo : { 
        id: newId, 
        uploadedId : null, 
        errorMsg : "" ,
        fileUrl : null
      }
    })
  };
  

  const updateUploader = (id: number | string, file: File | null) => {
    setUploaders(prevUploaders => 
      prevUploaders.map(uploader=>
        uploader.id === id ? { ...uploader, file, temp: file ? true : false } : uploader
      )
    );
  };


  const updateIdUploader = (id: number | string, uploadedId: string | null, bucketName: string, fileName: string) => {
    setUploaders(prevUploaders => 
      prevUploaders.map((uploader) =>
        uploader.id === id ? { ...uploader, uploadedId, fileUrl: { bucketName, fileName }, temp: false } : uploader
      )
    );
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
    //setUploaders(prevUploaders => prevUploaders.filter(item => item.id !== id));
    change({ type: 'removeFile', uploadInfo: { id } });
  }

  const removeUploadHandlerByidUploadedId = (id: number) => {
    //--- remove by id removeUploadHandlerByidUploadedId , remove uploaded image from server ---//
    // setUploaders(prevUploaders => {
    //   if (prevUploaders.length === 1) {
    //     return prevUploaders.map((item) => {
    //       if (item.id === Number(id)) {
    //         return {
    //           ...item,
    //           file: null,
    //           uploadedId: null,
    //           fileUrl: null,
    //           temp: false,
    //         };
    //       } else {
    //         return item;
    //       }
    //     });
    //   } else {
    //     return prevUploaders.filter((item) => item.id !== Number(id));
    //   }
    // });
    change({ type: 'removeFile', uploadInfo: { id } });
  };



  const removeUploadServerHandler = ( id : number  , uploadedId : number) => {
    setCurrentUpload({ id , uploadedId });
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
        <div  className="flex gap-5 flex flex-wrap justify-center items-start">
          {uploaders.map(({ id , uploadedId , file , fileUrl , errorMsg, temp}) => (
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
                inSidebar={config.inSidebar}
              />
          ))}
          { !config.isSingle ? 
            (
              <div
              className="text-texPrimary-100 dark:text-white-100 my-auto transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-center"
              onClick={addUploader}
              style={{
                padding: "8px 16px",
                border: "2px solid #d1d5db",
                borderRadius: "8px",
                minWidth: "120px",
                height: "auto",
                textAlign: "center",
                fontSize: "0.9rem",
                fontWeight: "500",
                backgroundColor: "transparent",
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