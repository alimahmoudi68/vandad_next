"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  getProfile,
  editProdile
} from "@/services/dashboard/profileService";
import Form from "@/components/common/form/Form";
import Card from "@/components/common/card/Card";
import SkeletonLoading from "@/components/common/skeletonLoading/SkeletonLoading";
import { IEditProfileApi } from "@/types/profile";


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

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [form, setForm] = useState<IForm>();

  useEffect(() => {
    const getProfileFromServer = async () => {
      const [profileData] = await Promise.all([
        getProfile(),
      ]);

      setLoading(false);

      console.log('profileData' , profileData)
      // console.log('categoriesData' , categoriesData)

      if (profileData.status === "success") {
        setForm({
          formItems: [
            {
              inputType: "simple-input-with-label",
              config: {
                label: "نام",
                name: "firstName",
                classes: "w-full",
              },
              value: profileData.profile?.firstName ?? "",
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
                  label: "نام خانوادگی",
                  name: "lastName",
                  classes: "w-full",
                },
                value: profileData.profile?.lastName ?? "",
                validation: {
                  maxLength: 50,
                  required: true,
                },
                valid: false,
                errorMsg: "",
                used: false,
              },
              {
                inputType: "textarea",
                config: {
                  label: "دباره من",
                  name: "about",
                  classes: "w-full",
                },
                value: profileData.profile?.about ?? "",
                validation: {
                  maxLength: 50,
                  required: true,
                },
                valid: false,
                errorMsg: "",
                used: false,
              },
              {
                inputType: "file",
                config: {
                  label: "آواتار",
                  name: "avatar",
                  classes: "w-full",
                  removeFromServer: false,
                  isSingle: true,
                },
                 value: [{ 
                   id: 0, 
                   uploadedId: profileData.profile?.avatar ? profileData.profile.avatar.id : null,
                   errorMsg: "",
                   fileUrl: profileData.profile?.avatar ? {bucketName: profileData.profile.avatar.bucket, fileName: profileData.profile.avatar.location} : null,
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
    getProfileFromServer();
  }, []);


  const submitHandler = async (form: IEditProfileApi) => {
    console.log('submit form ' , form)
    setLoadingBtn(true);
    try {
      if ("firstName" in form && "lastName" in form && "about" in form) {
        const data = await editProdile(form);
        
        console.log('edit res' , data)

        if (data.status === "success") {
          toast.success("اطلاعات کاربری با موفقیت ویرایش شد");
          router.push("/admin-dashboard");
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
        ویرایش اطلاعات کاربری
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
