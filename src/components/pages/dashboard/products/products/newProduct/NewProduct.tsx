"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { newProduct } from "@/services/dashboard/products/productsService";
import Form from "@/components/common/form/Form";
import { handleServerError } from "@/utils/common/handleServerError";
import Card from "@/components/common/card/Card";
import { INewProduct } from "@/types/dashboard/products";
import filterSingleAttributes from "@/utils/common/removeVariantsAttributes";

interface ICategory {
  _id: string;
  title: string;
  slug: string;
  [key: string]: any;
}

interface NewProductPageProps {
  permissions: string[];
  categories: ICategory[];
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

export default function NewProductPage({
  permissions,
  categories,
}: NewProductPageProps) {
  const router = useRouter();

  const [loadingBtn, setLoadingBtn] = useState(false);

  const [commonForm] = useState<IForm>({
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
          required: true,
          maxLength: 50,
        },
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "simple-input-price-with-label",
        config: {
          label: "قیمت فروش",
          name: "price",
          type: "text",
          placeholder: "",
          classes: "w-full",
        },
        value: "",
        value2: "",
        validation: {
          required: true,
        },
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "checkbox",
        config: {
          label: "تخفیف",
          name: "discount",
          classes: "w-full",
        },
        value: false,
        validation: {},
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "simple-input-price-with-label",
        config: {
          label: "قیمت با تخفیف",
          name: "discountPrice",
          classes: "w-full",
          isDepend: true,
          isDependField: "discount",
          isDependValue: [true],
        },
        value: "",
        value2: "",
        validation: {},
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "textarea",
        config: {
          label: "توضیحات",
          name: "description",
          classes: "w-full",
        },
        value: "",
        validation: {
          required: true,
          maxLength: 2000,
        },
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "simple-input-with-label",
        config: {
          label: "شناسه کالا",
          name: "sku",
          classes: "w-full",
        },
        value: "",
        validation: {},
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "simple-input-number-with-label",
        config: {
          label: "موجودی",
          name: "stock",
          classes: "w-full",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "file",
        config: {
          label: "عکس شاخص",
          name: "thumbnail",
          classes: "w-full",
          removeFromServer: true,
          isSingle: true,
        },
        value: [
          {
            id: 0,
            uploadedId: null,
            errorMsg: "",
            fileUrl: null,
          },
        ],
        validation: {},
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "file",
        config: {
          label: "گالری عکس",
          name: "images",
          classes: "w-full",
          removeFromServer: true,
        },
        value: [
          {
            id: 0,
            uploadedId: null,
            errorMsg: "",
            fileUrl: null,
          },
        ],
        validation: {},
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "select-with-label",
        config: {
          label: "دسته بندی",
          name: "categories",
          classes: "w-full",
          options: categories.map((item: ICategory) => ({
            id: item._id,
            title: item.title,
          })),
          showAttributes: true,
        },
        value: [],
        validation: {
          required: true,
        },
        valid: false,
        errorMsg: "",
        used: false,
      },
    ],
  });

  const submitHandler = async (form: INewProduct) => {
    setLoadingBtn(true);

    try {
      const {
        title,
        slug,
        description,
        price,
        discount,
        discountPrice,
        thumbnail,
        images,
        stock,
        sku,
        categories,
        variants,
        ...rest
      } = form;

      //console.log('rest >>> ' , rest)

      const payload = {
        title,
        slug,
        description,
        price,
        discount,
        discountPrice,
        thumbnail: thumbnail[0],
        images,
        stock,
        sku,
        categories,
        variants,
        attributes: filterSingleAttributes({ attributes: rest }).attributes,
      };

      console.log(payload);

      const data = await newProduct(payload);

      if (data.status === "success") {
        toast.success("محصول جدید با موفقیت ثبت شد");
        router.push("/dashboard/products");
      } else {
        handleServerError({
          ...data,
          msg: data.msg ?? "خطایی رخ داده است.",
        });
      }
    } catch (err) {
      console.log(err);
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
        محصول جدید
      </h1>
      <Card title="" classes="w-[90%] max-w-[600px] mx-auto">
        <Form
          initForm={commonForm}
          submit={submitHandler}
          loading={loadingBtn}
          submitTitle="ثبت"
        />
      </Card>
    </div>
  );
}
