"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  singleComment,
  updateComment
} from "@/services/dashboard/tv/tvCommentsService";

import Form from "@/components/common/form/Form";
import Card from "@/components/common/card/Card";
import SkeletonLoading from "@/components/common/skeletonLoading/SkeletonLoading";


interface EditTvCommentPageProps {
  id: number;
}


interface IEditComment{
  content: string,
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

export default function EditTvCommentPage({ id }: EditTvCommentPageProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [form, setForm] = useState<IForm>();

  useEffect(() => {
    const getComment = async () => {
      const [commentData] = await Promise.all([
        singleComment(id),
      ]);

      setLoading(false);

      console.log('commentData' , commentData)
      // console.log('categoriesData' , categoriesData)

      if (
        commentData.status === "success") {
        setForm({
          formItems: [
            {
              inputType: "textarea",
              config: {
                label: "نظر",
                name: "content",
                classes: "w-full",
              },
              value: commentData.comment ? commentData.comment.content : "",
              validation: {
                maxLength: 50,
                required: true,
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
    getComment();
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

      const data = await updateComment(id, payload as IEditComment);

      if (data.status === "success") {
        toast.success("نظر با موفقیت ویرایش شد");
        router.push("/admin-dashboard/tvs/comments");
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
        ویرایش نظر
      </h1>
      <Card title="" classes="w-[90%] max-w-[1200px] mx-auto mb-5">
        {
          loading ? 
          (
            <SkeletonLoading rows={10} cols={1} itemClasses={"h-[60px]"} />
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
