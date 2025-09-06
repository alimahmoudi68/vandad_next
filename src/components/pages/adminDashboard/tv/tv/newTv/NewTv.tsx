"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import Form from "@/components/common/form/Form";
import Card from "@/components/common/card/Card";
import {getTvCats} from "@/services/adminDashboard/tv/tvCatsService";
import {newTv} from "@/services/adminDashboard/tv/tvService";
import SkeletonLoading from "@/components/common/skeletonLoading/SkeletonLoading";


interface NewTVPageProps {
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



export default function NewTvPage({
  permissions,
}: NewTVPageProps) {
  const router = useRouter();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form , setForm] = useState<IForm>({formItems : []});

  useEffect(()=>{
    const getTvCat = async()=>{
      try{

        const data = await getTvCats();
        setLoading(false);

        if (data.status === "success") {

            setForm({ formItems: [
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
                  required: true,
                  maxLength: 150,
                },
                valid: false,
                errorMsg: "",
                used: false,
              },
              {
                inputType: "simple-input-with-label",
                config: {
                  label: "لینک ویدیو",
                  name: "video_url",
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
                inputType: "simple-input-with-label",
                config: {
                  label: "زمان ویدیو",
                  name: "time",
                  placeholder: "به صورت دقیقه و ثانیه وارد کنید (مثلا 02:30)",
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
                inputType: "textarea",
                config: {
                  label: "کلمات کلیدی سئو",
                  name: "keywords_meta",
                  classes: "w-full",
                },
                value: "",
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
                value: "",
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
                  data.categories && data.categories.map(item => ({
                    id: item.id,
                    title: item.title,
                  })),
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
                inputType: "editor",
                config: {
                  label: "محتوا",
                  name: "content",
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
                  name: "image",
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
            ]
          });
        }else {
          toast.error('مشکلی پیش آمده لطفا بعدا تلاش کنید');
          setLoading(false);
        }
      }catch(err){
        toast.error('مشکلی پیش آمده لطفا بعدا تلاش کنید');
        setLoading(false);
      }
    }
    getTvCat();
} , []);

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
          image: form.get("image") as string,
          time: form.get("time") as string,
          video_url: form.get("video_url") as string,
        };
      } else {
        payload = {
          title: form.title,
          slug: form.slug,
          keywords_meta: form.keywords_meta,
          description_meta: form.description_meta,
          content: form.content,
          categories: form.categories,
          image: form.image,
          time: form.time,
          video_url: form.video_url
        };
      }
  
      payload.image = payload.image ? parseInt(payload.image) : 0;
      const data = await newTv(payload);


      if (data.status === "success") {
        toast.success("ویدیوی جدید با موفقیت ثبت شد");
        router.push("/admin-dashboard/tvs");
      } else {
        toast.error(Array.isArray(data.message) ? data.message.join("، ") : data.message || "خطایی رخ داد");
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
        ویدیوی جدید
      </h1>
      <Card title="" classes="w-[90%] max-w-[1200px] mx-auto">
      {
        loading ? 
        (
          <SkeletonLoading rows={8} cols={1} itemClasses={"h-[100px]"} />
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
