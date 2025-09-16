"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { updateAttributeMeta } from "@/services/adminDashboard/products/attributesMetaService";
import Form from "@/components/common/form/Form";
import Card from "@/components/common/card/Card";

import { IAttributeMeta } from "@/types/products";
import { IAttribute } from "@/types/products";

interface EditAttributeMetaPageProps {
  permissions: string[];
  attributeMeta: IAttributeMeta;
  attributes: IAttribute[];
  id: string;
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

export default function EdiitAttributeMetaPage({
  permissions,
  attributeMeta,
  attributes,
  id,
}: EditAttributeMetaPageProps) {
  const router = useRouter();
  const [loadingBtn, setLoadingBtn] = useState(false);


  console.log('attributeMeta' , attributeMeta)


  const initFormInput: IForm = {
    formItems: [
      {
        inputType: "simple-input-with-label",
        config: {
          label: "عنوان",
          name: "title",
          classes: "w-full",
        },
        value: attributeMeta.title,
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
        value: attributeMeta.slug,
        validation: {
          maxLength: 50,
          required: true,
        },
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "select-with-label",
        config: {
          label: "ویژگی",
          name: "attribute",
          options: attributes,
          classes: "w-full",
        },
        value: attributeMeta.metas?.[0]?.id ?? "",
        validation: {
          selectRequired: true,
        },
        valid: false,
        errorMsg: "",
        used: false,
      },
    ],
  };

  const [FormInput] = useState<IForm>(initFormInput);

  const submitHandler = async (form: FormData | Record<string, any>) => {
    setLoadingBtn(true);
    try {
      if ("title" in form && "slug" in form) {
        const data = await updateAttributeMeta(id, {
          title: form.title,
          slug: form.slug,
        });

        if (data.status === "success") {
          toast.success("مقدار ویژگی محصول با موفقیت ویرایش شد");
          router.push("/admin-dashboard/product-attribute-metas");
        } else {
          toast.error(data.msg || "خطایی رخ داد");
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
        ویرایش مقدار ویژگی محصول
      </h1>
      <Card title="" classes="w-[90%] max-w-[600px] mx-auto mb-5">
        <Form
          initForm={FormInput}
          submit={submitHandler}
          loading={loadingBtn}
          submitTitle="ویرایش"
        />
      </Card>
    </div>
  );
}
