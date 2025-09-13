"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { newProduct } from "@/services/adminDashboard/products/productsService";
import Form from "@/components/common/form/Form";
import { handleServerError } from "@/utils/common/handleServerError";
import Card from "@/components/common/card/Card";
import filterSingleAttributes from "@/utils/common/removeVariantsAttributes";
import { IProductCat, INewProduct } from "@/types/products/index";


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

interface INewProductProps{
  categories: IProductCat[]
}

export default function NewProductPage({categories} : INewProductProps) {
  const router = useRouter();


  const [loadingBtn, setLoadingBtn] = useState(false);
  const [form] = useState<IForm>({formItems : [
    {
      inputType: "simple-input-with-label",
      config: {
        label: "عنوان",
        name: "title",
        classes: "w-full",
        area: 'main',
        sectionId: 'basic', 
        sectionTitle: 'اطلاعات پایه', 
        order: 1, 
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
        isDepend: true,
        isDependField: "variants",
        isDependValue: [],
        classes: "w-full",
        area: 'main',
        sectionId: 'basic', 
        sectionTitle: 'اطلاعات پایه', 
        order: 1, 
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
      inputType: "simple-input-price-with-label",
      config: {
        isOutString: true , 
        label: "قیمت با تخفیف",
        name: "discountPrice",
        classes: "w-full",
        isDepend: true,
        isDependField: "variants",
        isDependValue: [],
        area: 'main',
        sectionId: 'basic', 
        sectionTitle: 'اطلاعات پایه', 
        order: 1, 
      },
      value: "",
      value2: "",
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
        area: "sidebar",
        cardId: "catsBox",
        cardTitle: "دسته‌بندی‌ها",
        order: 1,
        options: categories.map((item: IProductCat) => ({
          id: item.id,
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
    {
      inputType: "textarea",
      config: {
        label: "توضیحات",
        name: "description",
        classes: "w-full",
        area: 'main',
        sectionId: 'basic', 
        sectionTitle: 'اطلاعات پایه', 
        order: 1, 
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
        area: 'main',
        sectionId: 'basic', 
        sectionTitle: 'اطلاعات پایه', 
        order: 1, 
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
        area: 'main',
        sectionId: 'basic', 
        sectionTitle: 'اطلاعات پایه', 
        order: 1, 
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
      inputType: "file",
      config: {
        label: "عکس شاخص",
        name: "thumbnail",
        classes: "w-full",
        removeFromServer: true,
        isSingle: true,
        area: 'main',
        sectionId: 'thumbnailBox', 
        sectionTitle: '', 
        order: 5, 
      },
      value: [
        {
          id: 0,
          uploadedId: null,
          errorMsg: "",
          fileUrl: null,
        },
      ],
      validation: {
        maxSize: 50, // حداکثر 50 مگابایت
        allowTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
      },
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
        area: 'main',
        sectionId: 'galleryBox', 
        sectionTitle: '', 
        order:5,
      },
      value: [
        {
          id: 0,
          uploadedId: null,
          errorMsg: "",
          fileUrl: null,
        },
      ],
      validation: {
        maxSize: 50, // حداکثر 50 مگابایت
        allowTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
      },
      valid: false,
      errorMsg: "",
      used: false,
    },
  ]});




  const submitHandler = async (form: INewProduct) => {
    setLoadingBtn(true);

    try {
      const {
        title,
        description,
        price,
        discountPrice,
        thumbnail,
        images,
        stock,
        sku,
        categories,
        ...rest
      } = form;

      //console.log('rest >>> ' , rest)

      const payload = {
        title,
        description,
        price,
        discountPrice,
        thumbnail,
        images,
        stock,
        sku,
        categories,
        attributes: filterSingleAttributes({ attributes: rest }).attributes,
      };

      console.log(payload);
      return

      const data = await newProduct(payload);

      //console.log('data >>> ' , data)


      if (data.status === "success") {
        toast.success("محصول جدید با موفقیت ثبت شد");
        router.push("/admin-dashboard/products");
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
      
        <Form
          initForm={form}
          submit={submitHandler}
          loading={loadingBtn}
          submitTitle="ثبت"
          config={{ forComment: false, layout: "wp", activeTabId: "general" }}
        />
        
    </div>
  );
}
