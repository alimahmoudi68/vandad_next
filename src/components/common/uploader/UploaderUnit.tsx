"use client";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

import { newUpload } from "../../../services/dashboard/uploads/uploadsService";
import ShowImg from "@/components/common/showImg/ShowImg";

interface UploaderUnitProps {
  id: number | string;
  uploadedId: any;
  file: File | null;
  fileUrl: { bucketName: string; fileName: string };
  onFileChange: (file: File) => void;
  removeUploadHandler?: (id: number | string) => void;
  uploadHandler: (
    id: number | string,
    data: { uploadedId: any; fileName: string; bucketName: string }
  ) => void;
  removeUploadServerHandler: (idUpload: number | string) => void;
  validation?: { maxSize?: number; allowTypes?: string[] } | null;
  errorMsg?: string | null;
}

interface RemoveUploaderHandlerEvent extends React.MouseEvent<SVGSVGElement> {
  stopPropagation: () => void;
}

interface RemoveUploaderServerHandler {
  (): void;
}

export default function UploaderUnit({
  id,
  uploadedId,
  file,
  fileUrl,
  onFileChange,
  removeUploadHandler,
  uploadHandler,
  removeUploadServerHandler,
  validation = {
    maxSize: 10,
    allowTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  },
  errorMsg = null,
}: UploaderUnitProps) {
  const inputFile = useRef<HTMLInputElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
      setUploading(false);
      setUploadSuccess(null);
      if (inputFile.current) {
        inputFile.current.value = "";
      }
    }
  }, [file, uploadedId]);

  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
  }

  const handleFileChange = (event: FileChangeEvent): void => {
    const selectedFile = event.target.files?.[0];

    if (
      selectedFile &&
      validation?.maxSize &&
      selectedFile.size > validation.maxSize * 1000000
    ) {
      toast.error(`حداکثر اندازه مجاز  ${validation.maxSize} مگابایت است`);
      return;
    }

    if (
      selectedFile &&
      validation?.allowTypes &&
      !validation.allowTypes.includes(selectedFile.type)
    ) {
      toast.error("تایپ فایل نامعتبر است");
      return;
    }

    event.stopPropagation();

    if (selectedFile) {
      onFileChange(selectedFile);
    }
  };

  const removeUploaderHandler = (e: RemoveUploaderHandlerEvent): void => {
    e.stopPropagation();
    if (removeUploadHandler) {
      removeUploadHandler(id);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadSuccess(null); // Reset previous success state

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await newUpload(formData);

      console.log('res' , response);

      if (response.status == "success") {
        uploadHandler(id, {
          uploadedId: response.upload?.id ?? "",
          fileName: response.upload?.location ?? "",
          bucketName: response.upload?.bucket ?? "",
        });

        setUploadSuccess(true);
        toast.success("عکس با موفقیت آپلود شد!");
      } else {
        console.log("response.msg", response);
        setUploadSuccess(false);
        toast.error(response.msg ?? "مشکلی در آپلود عکس پیش آمد.");
      }
    } catch (error) {
      toast.error("خطا در آپلود");
      setUploadSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  const removeUploaderServerHandler: RemoveUploaderServerHandler = () => {
    removeUploadServerHandler(uploadedId);
  };

  return (
    <div className="p-[0px] max-w-[400px] relative">
      <div
        className={`relative ${
          previewUrl ? "bg-transparent" : "bg-white-100 dark:bg-bgDark-100"
        }`}
        onClick={() =>
          !uploadedId && inputFile.current && inputFile.current.click()
        }
        style={{
          width: "200px",
          height: "200px",
          border: errorMsg
            ? "2px dashed rgb(236, 48, 14)"
            : uploadedId
            ? "2px dashed #22c55e"
            : "2px dashed rgb(128, 122, 122)",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: uploadedId ? "" : "pointer",
          padding: uploadedId ? "" : "3px",
        }}
      >
        {!uploadedId && id !== 0 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="w-[24px] h-[24px] absolute left-[-20px] top-[-20px] stroke-gray-700"
            onClick={removeUploaderHandler}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        ) : null}

        {uploadedId ? (
          <ShowImg
            bucketName={fileUrl.bucketName}
            fill={true}
            classes="contain object-cover"
            fileName={fileUrl.fileName}
            width={200}
            height={200}
          />
        ) : (
          <>
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span style={{ color: "#aaa" }}>برای انتخاب عکس کلیک کنید</span>
            )}
          </>
        )}
      </div>

      <input
        ref={inputFile}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {errorMsg !== "" ? (
        <span className="text-sm text-red-500">{errorMsg}</span>
      ) : null}

      {file && (
        <div style={{ marginTop: "20px" }} className="w-full">
          <div className="w-full flex justify-center items-center mb-2">
            {uploadSuccess ? (
              <div className="flex gap-x-5">
                <div className="flex items-center gap-x-[2px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    className="w-[20px] h-[20px] hover:opacity-80 stroke-green-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <span className="text-[0.8rem] text-green-500 ">
                    بارگذاری شد
                  </span>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className="w-[20px] h-[20px] cursor-pointer hover:opacity-80 stroke-red-500"
                  onClick={() => removeUploaderServerHandler()}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            ) : (
              <button
                onClick={handleUpload}
                className={`w-fit mt-[10px] px-[16px] py-[8px] mx-auto text-gray-6  00 rounded-lg ${
                  uploading ? "bg-[#ccc]" : "bg-transparent border"
                }`}
                style={{
                  cursor: uploading ? "not-allowed" : "pointer",
                }}
                disabled={uploading}
              >
                {uploading ? "در حال آپلود..." : "آپلود"}

                {!uploading && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-[20px] h-[20px] mr-2 inline"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>

          <p className="text-[0.8rem]">نام: {file.name}</p>
          <p className="text-[0.8rem]">
            حجم: {(file.size / 1024).toFixed(2)} کیلوبایت
          </p>
        </div>
      )}

      {uploadedId && !file ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="w-[20px] h-[20px] cursor-pointer hover:opacity-80 stroke-red-500 mx-auto mt-[20px]"
          onClick={() => removeUploaderServerHandler()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      ) : null}
    </div>
  );
}
