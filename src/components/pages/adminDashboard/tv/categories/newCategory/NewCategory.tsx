"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { newCategory } from "@/services/adminDashboard/tv/tvCatsService";
import Form from "@/components/common/form/Form";
import Card from "@/components/common/card/Card";

interface NewCategoryPageProps {
  permissions: string[];
}

interface FormItem {
  inputType: string;
  config: {
    name: string;
    label: string;
    classes?: string;
    [key: string]: any;
  };
  value: any;
  value2?: any;
  validation: Record<string, any>;
  valid: boolean;
  errorMsg: string;
  used: boolean;
}

interface IForm {
  formItems: FormItem[];
}

export default function NewCategoryPage({
  permissions,
}: NewCategoryPageProps) {
  const router = useRouter();
  const [loadingBtn, setLoadingBtn] = useState(false);

  const initFormInput: IForm = {
    formItems: [
      {
        inputType: "simple-input-with-label",
        config: {
          label: "عنوان",
          name: "title",
          classes: "w-full",
        },
        value: "",
        validation: {
          maxLength: 50,
          required: true,
        },
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "simple-input-with-label",
        config: {
          label: "اسلاگ",
          name: "slug",
          classes: "w-full",
        },
        value: "",
        validation: {
          maxLength: 50,
          required: true,
        },
        valid: false,
        errorMsg: "",
        used: false,
      }
    ],
  };

  const [FormInput] = useState<IForm>(initFormInput);

  const submitHandler = async (form: FormData | Record<string, any>) => {
    setLoadingBtn(true);
    try {
      if ("title" in form && "slug" in form) {
        const data = await newCategory({
          title: form.title,
          slug: form.slug,
          parent: form.parent,
        });

        console.log('data' , data)

        if (data.status === "success") {
          toast.success("دسته بندی جدید با موفقیت ثبت شد");
          router.push("/admin-dashboard/tv-cats");
        } else {
          toast.error(data.message || "خطایی رخ داد");
        }
      }
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "متاسفانه خطایی پیش آمد لطفا بعدا تلاش کنید"
      );
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <div className="container mx-auto p-3">
      <h1 className="text-gray-700 dark:text-white text-2xl font-extrabold mb-10">
        دسته بندی ویدیویی جدید
      </h1>
      <Card title="" classes="w-[90%] max-w-[600px] mx-auto">
        <Form
          initForm={FormInput}
          submit={submitHandler}
          loading={loadingBtn}
          submitTitle="ثبت"
        />
      </Card>
    </div>
  );
}
