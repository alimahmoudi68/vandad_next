"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { removeAttributeMeta } from '@/store/attributesMetaAdmin';
import MasterModal from '@/components/modals/masterModal/MasterModal';
import Button from "@/components/common/button/Button";
import { removeAttribute } from '@/services/adminDashboard/products/attributesMetaService';

export default function DeleteAttributeMetaModal({ id }: { id: number }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const handleConfirm = async () => {
    if (!loading) {
      try {
        setLoading(true);
        const numericId = Number(id);
        const data = await removeAttribute(numericId);
        setLoading(false);
        if (data.status === "success") {
          toast.success("دسته بندی با موفقیت حذف شد");
          dispatch(removeAttributeMeta(numericId));
          router.back();
        } else {
          toast.error("متاسفانه مشکلی رخ داده است، دقایقی بعدا مجددا تلاش کنید");
        }
      } catch (error) {
        toast.error("متاسفانه مشکلی رخ داده است، دقایقی بعدا مجددا تلاش کنید");
      }
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <MasterModal title="حذف ویژگی محصول" close={handleCancel}>
      <span className="dark:text-white-100 text-textPrimary-100">آیا از حذف ویژگی محصول مطمئن هستید؟</span>
      <div className="flex justify-center gap-3 mt-4">
        <Button loading={loading} click={handleConfirm} classes="w-[100px]">بله</Button>
        <Button click={handleCancel} classes="w-[100px]">خیر</Button>
      </div>
    </MasterModal>
  );
}