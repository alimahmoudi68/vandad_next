import React, { useState } from "react";
import { toast } from "react-toastify";

import Form from "@/components/common/form/Form";
import MasterModal from "@/components/modals/masterModal/MasterModal";
import { sendCommentBlog } from "@/services/public/blog/blogComments";
import { sendCommentTv } from "@/services/public/tvs/tvComments";

// تایپ‌های شرطی برای props
interface ModalCommentResBlogProps {
  type: "blog";
  parentId: number;
  blogId: number;
  close: () => void;
}

interface ModalCommentResCourseProps {
  type: "course";
  parentId: number;
  courseId: number;
  close: () => void;
}

interface ModalCommentResTvProps {
  type: "tv";
  parentId: number;
  tvId: number;
  close: () => void;
}

type ModalCommentResProps = ModalCommentResBlogProps | ModalCommentResCourseProps | ModalCommentResTvProps;

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

const ModalCommentRes: React.FC<ModalCommentResProps> = (props) => {
  const { type, parentId, close } = props;
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [form, setForm] = useState<IForm>({
    formItems: [
      {
        inputType: "textarea",
        config: {
          label: "نظر",
          name: "content",
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
    ],
  });

  const submitHandler = async (form: FormData | Record<string, any>) => {
    setLoadingBtn(true);
    try {
      let payload;

      if (form instanceof FormData) {
        payload = {
          content: form.get("content") as string,
        };
      } else {
        payload = {
          content: form.content,
        };
      }

      let data;
      if (type === "blog") {
        data = await sendCommentBlog({ ...payload, parentId: parentId, blogId: (props as ModalCommentResBlogProps).blogId });
      } else if (type === "course") {
        //data = await sendComment({ ...payload, parentId: parentId, courseId: (props as ModalCommentResCourseProps).courseId });
      } else if (type === "tv") {
        data = await sendCommentTv({ ...payload, parentId: parentId, tvId: (props as ModalCommentResTvProps).tvId });
      }

      console.log('data2222', data);

      if (data && data.status === "success") {
        toast.success("نظر شما با موقیت ثبت شد و پس از تایید نمایش داده می شود");
        close();
      } else if(data) {
        toast.error(
          Array.isArray(data.message)
            ? data.message.join("، ")
            : data.message || "خطایی رخ داد"
        );
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
    <>
      <MasterModal close={close} title={"پاسخ به نظر"} isWide={true}>
        <div className="w-full flex flex-col">
          <Form
            initForm={form}
            submit={submitHandler}
            loading={loadingBtn}
            submitTitle="ثبت"
          />
        </div>
      </MasterModal>
    </>
  );
};

export default ModalCommentRes;