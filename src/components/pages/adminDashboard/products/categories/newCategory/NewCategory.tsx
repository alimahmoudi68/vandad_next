"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  newCategory,
  categories,
} from "@/services/adminDashboard/products/categoriesService";
import Form from "@/components/common/form/Form";
import Card from "@/components/common/card/Card";
import SkeletonLoading from "@/components/common/skeletonLoading/SkeletonLoading";


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

export default function NewCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [form , setForm] = useState<IForm>({ formItems: [] });

  useEffect(() => {
    const getCats = async () => {
      try {
        const data = await categories();
        setLoading(false);

        //console.log('d' , data.categories)

        if (data.status === "success") {
          setForm({
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
              },
              {
                inputType: "select-with-label",
                config: {
                  label: "دسته بندی پدر",
                  name: "parent",
                  options: [
                    { id: null, title: "بدون دسته بندی پدر" },
                    ...(Array.isArray(data.categories)
                      ? data.categories.map((item) => ({
                          id: item.id,
                          title: item.title,
                        }))
                      : []),
                  ],
                  classes: "w-full",
                },
                value: null,
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
          toast.error("مشکلی پیش آمده لطفا بعدا تلاش کنید");
          setLoading(false);
        }
      } catch (err) {
        toast.error("مشکلی پیش آمده لطفا بعدا تلاش کنید");
        setLoading(false);
      }
    };
    getCats();
  }, []);

  const submitHandler = async (form: FormData | Record<string, any>) => {
    setLoadingBtn(true);
    try {
      if ("title" in form && "slug" in form) {
        const data = await newCategory({
          title: form.title,
          slug: form.slug,
          parent: form.parent,
        });

        if (data.status === "success") {
          toast.success("دسته بندی جدید با موفقیت ثبت شد");
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
        دسته بندی جدید
      </h1>
      <Card title="" classes="w-[90%] max-w-[600px] mx-auto">
        {
        loading ? 
        (
          <SkeletonLoading rows={3} cols={1} itemClasses={"h-[70px]"} />
        ) : (
        <Form
          initForm={form}
          submit={submitHandler}
          loading={loadingBtn}
          submitTitle="ثبت"
        />
        )
        }
      </Card>
    </div>
  );
}
