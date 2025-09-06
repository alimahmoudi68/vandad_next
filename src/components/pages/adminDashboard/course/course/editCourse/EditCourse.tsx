"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  getCourseCats,
} from "@/services/adminDashboard/course/courseCatsService";
import {
  singleCourse,
  updateCourse,
} from "@/services/adminDashboard/course/courseService";
import Form from "@/components/common/form/Form";
import Card from "@/components/common/card/Card";
import SkeletonLoading from "@/components/common/skeletonLoading/SkeletonLoading";
import EditCourseEpisodePage from "../editCourseEpisode/EditCourseEpisode";


interface EditCoursePageProps {
  id: number;
}

interface IEpisode {
  id: number,
  title: string,
  content: string,
  date: string
  time: string,
  price: number,
  created_at: string,
  upated_at: string,
}

interface ICategory {
  id: string;
  title: string;
  slug: string;
  [key: string] : any
}

interface INewCourse{
  title: string,
  slug: string,
  keywords_meta: string,
  description_meta: string,
  content: string,
  categories: number[],
  image: number,
  faqs: {question: string, answer: string}[]
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

export default function EditCoursePage({ id }: EditCoursePageProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [form, setForm] = useState<IForm>();
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  useEffect(() => {
    const getCourse = async () => {
      const [courseData, categoriesData] = await Promise.all([
        singleCourse(id),
        getCourseCats(),
      ]);

      setLoading(false);

      //console.log('courseData' , courseData)
      //console.log(typeof courseData.course.episodes[4].content);

      // console.log('categoriesData' , categoriesData)

      if (
        courseData.status === "success" &&
        categoriesData.status === "success"
      ) {
        setEpisodes(courseData.course.episodes);
        setForm({
          formItems: [
            {
              inputType: "simple-input-with-label",
              config: {
                label: "عنوان",
                name: "title",
                classes: "w-full",
              },
              value: courseData.course.title,
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
              value: courseData.course.slug,
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
              value: courseData.course.keywords_meta,
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
              value: courseData.course.description_meta,
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
              value: courseData.course.categories.map((item: ICategory)=>(item.id)),
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
              value:  courseData.course.content,
              validation: {
                required: true,
              },
              valid: false,
              errorMsg: "",
              used: false,
            },
            {
              inputType: "faqs",
              config: {
                label: "سوالات متداول",
                name: "faqs",
                classes: "w-full",
              },
              value: courseData.course.faqs.map((item:{question: string , answer: string})=>{
                return{
                  question: item.question,
                  answer: item.answer,
                  errs: {
                    question: "",
                    answer: "",
                  },
                }
              }),
              validation: {},
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
                uploadedId: courseData.course.image ? courseData.course.image.id : null,
                errorMsg: "",
                fileUrl: courseData.course.image ? {bucketName:courseData.course.image.bucket, fileName: courseData.course.image.location} : null,
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
    getCourse();
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
          image: form.get("image") as string,
          faqs : form.get("faqs") as string 
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
          faqs: form.faqs
        };
      }

      payload.image = payload.image ? parseInt(payload.image) : 0;

      const data = await updateCourse(id, payload as INewCourse);

      if (data.status === "success") {
        toast.success("دوره با موفقیت ویرایش شد");
        router.push("/admin-dashboard/courses");
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
        ویرایش دوره
      </h1>
      <Card title="" classes="-[90%] max-w-[1200px] mx-auto mb-5">
        {
          loading ? 
          (
            <SkeletonLoading rows={10} cols={1} itemClasses={"h-[70px]"} />
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
      <Card title="" classes="-[90%] max-w-[1200px] mx-auto mb-5">
        <EditCourseEpisodePage courseId={id} episodes={episodes}/>
      </Card>


    </div>
  );
}
