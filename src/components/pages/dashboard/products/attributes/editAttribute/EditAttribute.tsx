"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { updateAttribute } from "@/services/dashboard/products/attributesService";
import Form from "@/components/common/form/Form";
import Card from "@/components/common/card/Card";

interface IAttribute {
  _id: string;
  title: string;
  slug: string;
  metas: {
    _id: string;
    title: string;
    slug: string;
  }[];
  [key: string]: any;
}

interface EditAttributePageProps {
  permissions: string[];
  attribute: IAttribute;
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

export default function EdiitAttributePage({
  permissions,
  attribute,
  id,
}: EditAttributePageProps) {
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
        value: attribute.title,
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
        value: attribute.slug,
        validation: {
          maxLength: 50,
          required: true,
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
        value: attribute.isDynamic,
        validation: {
          maxLength: 50,
          required: true,
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
        const data = await updateAttribute(id, {
          title: form.title,
          slug: form.slug,
          isDynamic: form.isDynamic,
        });

        if (data.status === "success") {
          toast.success("ویژگی محصول با موفقیت ویرایش شد");
          router.push("/dashboard/attributes");
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
        ویرایش ویژگی محصول
      </h1>
      <Card title="" classes="w-[90%] max-w-[600px] mx-auto mb-5">
        <Form
          initForm={FormInput}
          submit={submitHandler}
          loading={loadingBtn}
          submitTitle="ویرایش"
        />
      </Card>
      <Card title="مقادیر ویژگی" classes="w-[90%] max-w-[600px] mx-auto mb-5">
        <div className="flex flex-col gap-2">
          {attribute.metas.map((meta) => (
            <div
              key={meta._id}
              className="flex justify-between items-center p-2 rounded-md border"
            >
              <span>{meta.title}</span>
              <span>{meta.slug}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
