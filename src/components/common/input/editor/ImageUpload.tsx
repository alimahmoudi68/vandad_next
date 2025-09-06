"use client";

import React, { useState } from "react";
import { newUpload } from "@/services/adminDashboard/uploads/uploadsService";

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  className = "",
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("لطفا فقط فایل تصویر آپلود کنید");
      return;
    }
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      // فراخوانی سرویس آپلود
      const response = await newUpload(formData);

      // ساخت آدرس عکس
      const upload = response.upload;
      const baseUrl = process.env.NEXT_PUBLIC_S3_URL;

      if (upload && baseUrl) {
        const imageUrl = `${baseUrl}/${upload.bucket}/${upload.location}`;
        onImageUpload(imageUrl);
      } else {
        alert("خطا در دریافت آدرس تصویر");
      }
    } catch (error) {
      alert("خطا در آپلود تصویر");
    }
    setIsUploading(false);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className={`image-upload ${className}`}>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={(e) => {
          // فقط stopPropagation انجام می‌دهیم، preventDefault نمی‌کنیم
          e.stopPropagation();
        }}
      >
        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
            <p className="text-gray-600">در حال آپلود...</p>
          </div>
        ) : (
          <div>
            <div className="text-4xl mb-2">📁</div>
            <p className="text-gray-600 mb-2">
              تصویر را اینجا بکشید یا کلیک کنید
            </p>
            <p className="text-sm text-gray-500">
              فرمت‌های پشتیبانی شده: JPG, PNG, GIF
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="image-upload-input"
            />
            <label
              htmlFor="image-upload-input"
              className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                // اجازه می‌دهیم که label کار کند
              }}
            >
              انتخاب فایل
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
