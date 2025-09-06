"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

import {
  categories,
  singleCategory,
  updateCategory,
} from "@/services/adminDashboard/products/categoriesService";
import Form from "@/components/common/form/Form";
import Card from "@/components/common/card/Card";


interface EditCategoryPageProps {
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

export default function EdiitCategoryPage({ id }: EditCategoryPageProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [form, setForm] = useState<IForm>();

  useEffect(() => {
    const getBlogCat = async () => {
      const [categoryData, categoriesData] = await Promise.all([
        singleCategory(+id),
        categories(),
      ]);

      //console.log('categoryData' , categoryData)
      //console.log('categoriesData' , categoriesData)

      if (
        categoryData.status === "success" &&
        categoriesData.status === "success"
      ) {
        setForm({
          formItems: [
            {
              inputType: "simple-input-with-label",
              config: {
                label: "عنوان",
                name: "title",
                classes: "w-full",
              },
              value: categoryData.category.title,
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
              value: categoryData.category.slug,
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
                label: "دسته بندی پدر",
                name: "parent",
                options: [
                  { id: null, title: "بدون دسته بندی پدر" },
                  ...(Array.isArray(categoriesData.categories)
                    ? categoriesData.categories.map((item) => ({
                        id: item.id,
                        title: item.title,
                      }))
                    : []),
                ],
                classes: "w-full",
              },
              value: categoryData.category.parent.id,
              validation: {
                selectRequired: true,
              },
              valid: false,
              errorMsg: "",
              used: false,
            },
          ],
        });
      } else {
        // اگر خطا بود، پیام خطا نمایش بده یا هندل کن
      }

      setLoading(false);
    };
    getBlogCat();
  }, []);


  const submitHandler = async (form: FormData | Record<string, any>) => {
    setLoadingBtn(true);
    try {
      if ("title" in form && "slug" in form) {
        const data = await updateCategory(+id, {
          title: form.title,
          slug: form.slug,
          parent: form.parent,
        });

        if (data.status === "success") {
          toast.success("دسته بندی جدید با موفقیت ویرایش شد");
          router.push("/admin-dashboard/product-cats");
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
        ویرایش دسته بندی
      </h1>
      <Card title="" classes="w-[90%] max-w-[600px] mx-auto mb-5">
        {form && (
          <Form
            initForm={form}
            submit={submitHandler}
            loading={loadingBtn}
            submitTitle="ویرایش"
          />
        )}
      </Card>
    </div>
  );
}
