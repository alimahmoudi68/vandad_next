import React, { useState } from "react";
import { toast } from "react-toastify";

import Form from "@/components/common/form/Form";
import MasterModal from "@/components/modals/masterModal/MasterModal";
import { updateEpisode } from "@/services/adminDashboard/episode/episodeService";
import { convertJalaliToGregorian } from "@/utils/common/convertJalaliToGregorian";
import { showDate } from "@/utils/common/showDate";

interface IEpisode {
  id: number;
  title: string;
  content: string;
  date: string;
  time: string;
  price: number;
  created_at: string;
  upated_at: string;
}

interface ModalEditEpisodeProps {
  close: () => void;
  done: (episode: IEpisode) => void;
  episode: IEpisode;
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

const ModalEditEpisode: React.FC<ModalEditEpisodeProps> = ({
  close,
  done,
  episode
}) => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [form, setForm] = useState<IForm>({
    formItems: [
      {
        inputType: "simple-input-with-label",
        config: {
          label: "عنوان",
          name: "title",
          classes: "w-full",
        },
        value: episode.title,
        validation: {
          maxLength: 50,
          required: true,
        },
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "simple-input-date",
        config: {
          label: "تاریخ برگزاری",
          name: "date",
          classes: "w-full",
        },
        value: showDate(episode.date),
        validation: {},
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "simple-input-price-with-label",
        config: {
          label: "هزینه",
          name: "price",
          type: "text",
          placeholder: "",
          classes: "w-full",
        },
        value: episode.price,
        value2: (episode.price).toLocaleString(),
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
          label: "مدت زمان جلسه",
          name: "time",
          classes: "w-full",
        },
        value: episode.time,
        validation: {
          maxLength: 50,
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
        value: episode.content,
        validation: {
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
          title: form.get("title") as string,
          content: form.get("content") as string,
          price: form.get("price") as string,
          date: form.get("date") as string,
          time: form.get("time") as string,
        };
      } else {
        payload = {
          title: form.title,
          content: form.content,
          price: form.price,
          date: form.date,
          time: form.time,
        };
      }

      payload.date = convertJalaliToGregorian(payload.date);

      const data = await updateEpisode(episode.id , payload);

      if (data.status === "success") {
        toast.success("قسمت جدید با موفقیت ثبت شد");
        done(data.episode as IEpisode);
        close();
      } else {
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
      <MasterModal close={close} title={"ویرایش جلسه"} isWide={true}>
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

export default ModalEditEpisode;
