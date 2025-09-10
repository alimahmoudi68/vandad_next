"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { newAttribute } from "@/services/adminDashboard/productattributes/attributesService";
import Form from '@/components/common/form/Form';
import Card from "@/components/common/card/Card";
import { handleServerError } from "@/utils/common/handleServerError";
import { IAttributes } from "@/types/attributes";


interface NewAttributePageProps {
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

export default function NewAttributePage({ 
  permissions,
}: NewAttributePageProps) {
  const router = useRouter();
  const [loadingBtn, setLoadingBtn] = useState(false);

  const initFormInput: IForm = {
    formItems: [
      {
        inputType:  "simple-input-with-label",
        config: {
          label: "عنوان",
          name: "title",
          classes: "w-full",
        },
        value: "",
        validation: {
          maxLength : 50,
          required: true
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
          maxLength : 50,
          required: true
        },
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "checkbox",
        config: {
          label: "نوع پوپا",
          name: "isDynamic",
          classes: "w-full",
        },
        value: false,
        validation: {
        },
        valid: true,
        errorMsg: "",
        used: false,
      },
    ],
  };

  const [FormInput] = useState<IForm>(initFormInput);

  const submitHandler = async (form: IAttributes) => {

    setLoadingBtn(true);
    try {

      const data = await newAttribute(form);

      if (data.status === "success") {
        toast.success('ویژگی جدید با موفقیت ثبت شد');
        router.push("/admin-dashboard/product-attributes");
      } else {
        handleServerError({
          ...data,
          msg: data.msg ?? 'خطایی رخ داده است.'
        })
      }
      
    } catch (err) {
      console.log(err)
      toast.error(err instanceof Error ? err.message : "متاسفانه خطایی پیش آمد لطفا بعدا تلاش کنید");
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <div className="container mx-auto p-3">
      <h1 className="text-gray-700 dark:text-white text-2xl font-extrabold mb-10">ویژگی جدید</h1>
      <Card title="" classes="w-[90%] max-w-[600px] mx-auto">
        <Form initForm={FormInput} submit={submitHandler} loading={loadingBtn} submitTitle="ثبت" />
      </Card>
    </div>
  );
}
