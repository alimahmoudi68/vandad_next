"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addCatAttributesAdmin } from "@/store/catAttributesAdmin";

import MasterModal from "@/components/modals/masterModal/MasterModal";
import Form from "@/components/common/form/Form";
import { newCategoryAttribute } from "@/services/adminDashboard/products/categoriesService";
import { attributes } from "@/services/dashboard/products/attributesService";
import { handleServerError } from "@/utils/common/handleServerError";
import SkeletonLoading from "@/components/common/skeletonLoading/SkeletonLoading";

interface IAttribute {
  _id: string;
  title: string;
  slug: string;
  [key: string]: any;
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

export default function DeleteCategoryModal({ id }: { id: string }) {
  const dispatch = useDispatch();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [allAttributes, setAllAttributes] = useState<IAttribute[]>([]);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [FormInput, setFormInput] = useState<IForm>({ formItems: [] });

  useEffect(() => {
    const getAttribute = async () => {
      try {
        setLoading(true);
        let attributesData = await attributes();
        setLoading(false);
        if (attributesData.status == "success") {
          //console.log('aar' , attributesData.attributes)
          setAllAttributes(attributesData.attributes || []);
          setFormInput({
            formItems: [
              {
                inputType: "select-multi",
                config: {
                  label: "ویژگی",
                  name: "attributes",
                  classes: "w-full",
                  options:
                    attributesData.attributes &&
                    attributesData.attributes.map((item: IAttribute) => ({
                      id: item._id,
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
            ],
          });
        } else {
          handleServerError(attributesData);
        }
      } catch (err) {
        setLoading(false);
        toast.error("مشکلی پیش آمده");
      }
    };
    getAttribute();
  }, []);

  const submitHandler = async (form: FormData | Record<string, any>) => {
    setLoadingBtn(true);
    try {
      if ("attributes" in form) {
        const data = await newCategoryAttribute(id, {
          attributes: form.attributes,
        });

        if (data.status === "success") {
          toast.success("ویژگی جدید با موفقیت اضافه شد");

          // dispatch(addCatAttributesAdmin({
          //   name: form.name,
          //   key: form.key,
          //   type: form.type
          // }));
          router.back();
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

  const handleCancel = () => {
    router.back();
  };

  return (
    <MasterModal title="اضافه کردن ویژگی به دسته بندی" close={handleCancel}>
      {loading ? (
        <SkeletonLoading rows={1} cols={1} itemClasses={"h-[100px]"} />
      ) : (
        <Form
          initForm={FormInput}
          submit={submitHandler}
          loading={loadingBtn}
          submitTitle="ثبت"
        />
      )}
    </MasterModal>
  );
}
