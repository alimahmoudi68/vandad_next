"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";

import {
  updateCatAttributesAdmin,
  setLoading,
} from "@/store/catAttributesAdmin";
import { updateCategory } from "@/services/dashboard/products/categoriesService";
import Form from "@/components/common/form/Form";
import Card from "@/components/common/card/Card";

interface ICategory {
  _id: string;
  title: string;
  slug: string;
  [key: string]: any;
}

interface IAttribute {
  _id: string;
  title: string;
  slug: string;
  [key: string]: any;
}

interface EditCategoryPageProps {
  permissions: string[];
  categories: ICategory[];
  attributes: IAttribute[];
  category: ICategory;
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

export default function EdiitCategoryPage({
  permissions,
  categories,
  attributes: allAttributes,
  category,
  id,
}: EditCategoryPageProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loadingBtn, setLoadingBtn] = useState(false);

  const { attributes, loading } = useSelector(
    (state: RootState) => state.catAttributesAdmin
  );

  useEffect(() => {
    dispatch(setLoading());
    dispatch(updateCatAttributesAdmin(category.attributes));
  }, [category.attributes, dispatch]);

  const initFormInput: IForm = {
    formItems: [
      {
        inputType: "simple-input-with-label",
        config: {
          label: "عنوان",
          name: "title",
          classes: "w-full",
        },
        value: category.title,
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
        value: category.slug,
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
            ...categories.map((cat) => ({ id: cat._id, title: cat.title })),
          ],
          classes: "w-full",
        },
        value: category.parent,
        validation: {
          selectRequired: true,
        },
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "select-multi",
        config: {
          label: "ویژگی ‌ها",
          name: "attributes",
          classes: "w-full",
          options:
            allAttributes &&
            allAttributes.map((item: IAttribute) => ({
              id: item._id,
              title: item.title,
            })),
        },
        value: category.attributes.map((item: IAttribute) => item._id),
        validation: {
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
        const data = await updateCategory(id, {
          title: form.title,
          slug: form.slug,
          parent: form.parent,
          attributes: form.attributes,
        });

        if (data.status === "success") {
          toast.success("دسته بندی جدید با موفقیت ویرایش شد");
          router.push("/dashboard/categories");
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
        <Form
          initForm={FormInput}
          submit={submitHandler}
          loading={loadingBtn}
          submitTitle="ویرایش"
        />
      </Card>
      <Card title="ویژگی‌ها" classes="w-[90%] max-w-[1000px] mx-auto">
        <div className="w-full hidden md:flex justify-between bg-background-100 dark:bg-darkBack-100 py-[20px] sticky top-[-40px]">
          <div className="w-[30%] font-semibold text-[1.1rem] text-textPrimary-100 dark:text-white-100 text-center">
            نام
          </div>
          <div className="w-[30%] font-semibold text-[1.1rem] text-textPrimary-100 dark:text-white-100 text-center">
            اسلاگ
          </div>
          <div className="w-[30%] font-semibold text-[1.1rem] text-textPrimary-100 dark:text-white-100 text-center">
            ویژگی پویا
          </div>
          <div className="w-[10%] font-semibold text-[1.1rem] text-textPrimary-100 dark:text-white-100 text-center">
            عملیات
          </div>
        </div>

        {attributes &&
          attributes.map((attribute, index) => (
            <div
              key={index}
              className="w-full rounded-md bg-white-100 dark:bg-cardDark-100 py-5 px-5 my-5 md:px-0 flex flex-wrap items-center justify-start"
            >
              <div className="w-full md:w-[30%] flex justify-start md:justify-center items-center">
                <span className="text-textPrimary-100 dark:text-white-50 font-semibold md:hidden">
                  عنوان:
                </span>
                <span className="font-semibold text-textPrimary-100 dark:text-white-100 mr-1 md:mr-0">
                  {attribute.title}
                </span>
              </div>

              <div className="w-full md:w-[30%] flex justify-center items-center">
                <span className="text-textPrimary-100 dark:text-white-50 font-semibold md:hidden">
                  اسلاگ:
                </span>
                <span className="text-textPrimary-100 dark:text-white-50 font-semibold mr-1">
                  {attribute.slug}
                </span>
              </div>

              <div className="w-full md:w-[30%] flex justify-center items-center">
                <span className="text-textPrimary-100 dark:text-white-50 font-semibold md:hidden">
                  ویژگی پویا:
                </span>
                <span className="text-textPrimary-100 dark:text-white-50 font-semibold mr-1">
                  {attribute.isDynamic ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </span>
              </div>

              <div className="w-full md:w-[10%] flex justify-end md:justify-center">
                <Link href={`/dashboard/categories`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 md:w-6 md:h-6 md:hover:stroke-primary-100 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </Link>
                <Link href={`/dashboard/categories/delete`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 md:w-6 md:h-6 mr-1 md:hover:stroke-primary-100 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        <Link href={`/dashboard/categories/${id}/add-attribute`}>
          <button className="bg-transparent text-textpPrimary-100 dark:text-white-100 border px-3 py-2 hover:border-primary-100 hover:cursor-pointer rounded-md">
            + افزودن ویژگی جدید
          </button>
        </Link>
      </Card>
    </div>
  );
}
