"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeCat } from "@/store/catsAdmin";
import MasterModal from "@/components/modals/masterModal/MasterModal";
import Button from "@/components/common/button/Button";
import { removeCategory } from "@/services/dashboard/blog/blogCatsService";

export default function DeleteCategoryModal({ id }: { id: string }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!loading) {
      try {
        setLoading(true);
        const data = await removeCategory(id);
        setLoading(false);
        if (data.status === "success") {
          toast.success("دسته بندی با موفقیت حذف شد");
          dispatch(removeCat(Number(id)));
          router.back();
        } else {
          toast.error(
            "متاسفانه مشکلی رخ داده است، دقایقی بعدا مجددا تلاش کنید"
          );
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
    <MasterModal title="حذف دسته بندی" close={handleCancel}>
      <span>آیا از حذف دسته بندی مطمئن هستید؟</span>
      <div className="flex justify-center gap-3 mt-4">
        <Button loading={loading} click={handleConfirm} classes="w-[100px]">
          بله
        </Button>
        <Button click={handleCancel} classes="w-[100px]">
          خیر
        </Button>
      </div>
    </MasterModal>
  );
}
