"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  getBlogCats,
} from "@/services/dashboard/blog/blogCatsService";
import {
  singleBlog,
  updateBlog,
} from "@/services/dashboard/blog/blogService";
import Form from "@/components/common/form/Form";
import Card from "@/components/common/card/Card";
import SkeletonLoading from "@/components/common/skeletonLoading/SkeletonLoading";


interface EditBlogPageProps {
  id: number;
}

interface ICategory {
  _id: string;
  title: string;
  slug: string;
  [key: string] : any
}

interface INewBlog{
  title: string,
  slug: string,
  keywords_meta: string,
  description_meta: string,
  content: string,
  categories: number[],
  image: number
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

export default function EdiitBlogPage({ id }: EditBlogPageProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [form, setForm] = useState<IForm>();

  useEffect(() => {
    const getBlog = async () => {
      const [blogData, categoriesData] = await Promise.all([
        singleBlog(id),
        getBlogCats(),
      ]);

      setLoading(false);

      // console.log('categoryData' , categoryData)
      // console.log('categoriesData' , categoriesData)

      if (
        blogData.status === "success" &&
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
              value: blogData.blog.title,
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
              value: blogData.blog.slug,
              validation: {
                required: true,
                maxLength: 150,
              },
              valid: false,
              errorMsg: "",
              used: false,
            },
            {
              inputType: "textarea",
              config: {
                label: "کلمات کلیدی سئو",
                name: "keywords_meta",
                classes: "w-full",
              },
              value: blogData.blog.keywords_meta,
              validation: {
                maxLength: 150,
              },
              valid: false,
              errorMsg: "",
              used: false,
            },
            {
              inputType: "textarea",
              config: {
                label: "توضیحات سئو",
                name: "description_meta",
                classes: "w-full",
              },
              value: blogData.blog.description_meta,
              validation: {
                maxLength: 50,
              },
              valid: false,
              errorMsg: "",
              used: false,
            },
            {
              inputType: "select-multi",
              config: {
                label: "دسته بندی",
                name: "categories",
                classes: "w-full",
                options:
                categoriesData.categories && categoriesData.categories.map(item => ({
                  id: item.id,
                  title: item.title,
                })),
              },
              value: blogData.blog.categories.map((item: ICategory)=>(item.id)),
              validation: {
                required: true,
              },
              valid: false,
              errorMsg: "",
              used: false,
            },
            {
              inputType: "editor",
              config: {
                label: "محتوا",
                name: "content",
                classes: "w-full",
              },
              value:  blogData.blog.content,
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
                name: "image",
                classes: "w-full",
                removeFromServer: false,
                isSingle: true,
              },
              value: [{ 
                id: 0, 
                uploadedId: blogData.blog.image ? blogData.blog.image.id : null,
                errorMsg: "",
                fileUrl: blogData.blog.image ? {bucketName: blogData.blog.image.bucket, fileName: blogData.blog.image.location} : null,
              }],
              validation: {},
              valid: false,
              errorMsg: "",
              used: false,
            }
          ],
        });
      } else {
        // اگر خطا بود، پیام خطا نمایش بده یا هندل کن
      }

      setLoading(false);
    };
    getBlog();
  }, []);


  const submitHandler = async (form: FormData | Record<string, any>) => {
    setLoadingBtn(true);
    try {
      let payload;

      if (form instanceof FormData) {
        payload = {
          title: form.get("title") as string,
          slug: form.get("slug") as string,
          keywords_meta: form.get("keywords_meta") as string,
          description_meta: form.get("description_meta") as string,
          content: form.get("content") as string,
          categories: form.getAll("categories") as string[],
          image: form.get("image") as string
        };
      } else {
        payload = {
          title: form.title,
          slug: form.slug,
          keywords_meta: form.keywords_meta,
          description_meta: form.description_meta,
          content: form.content,
          categories: form.categories,
          image: form.image
        };
      }

      payload.image = payload.image ? parseInt(payload.image) : 0;

      const data = await updateBlog(id, payload as INewBlog);

      if (data.status === "success") {
        toast.success("مقاله با موفقیت ویرایش شد");
        router.push("/admin-dashboard/blog");
      } else {
        toast.error(data.message || "خطایی رخ داد");
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
        ویرایش مقاله
      </h1>
      <Card title="" classes="w-[90%] max-w-[600px] mx-auto mb-5">
        {
          loading ? 
          (
            <SkeletonLoading rows={3} cols={1} itemClasses={"h-[50px]"} />
          )
          :
          (
          <>
            {form && (
              <Form
                initForm={form}
                submit={submitHandler}
                loading={loadingBtn}
                submitTitle="ویرایش"
              />
            )}
          </>
          )
        }
      </Card>
    </div>
  );
}
