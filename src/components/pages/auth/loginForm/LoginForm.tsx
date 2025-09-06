"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { otp, verify } from "@/services/auth/authService";
import Form from "@/components/common/form/Form";
import FormLogin from "@/components/common/form/FormLogin";
import Card from "@/components/common/card/Card";
import saveCookie from "@/utils/common/saveCookie";

interface FormData {
  phone: string;
  otp?: string;
}

interface OtpResponse {
  status: string;
  token?: string;
  msg?: string;
}

interface VerifyResponse {
  status: string;
  accessToken?: string;
  refreshToken?: string;
  msg?: string
}

interface VerifyFormData {
  otp: string;
}

const LoginForm = () => {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [phone, setPhone] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);

  const initForm1 = {
    formItems: [
      {
        inputType: "simple-input-number",
        config: {
          label: "",
          name: "phone",
          type: "text",
          placeholder: "شماره همراه خود را وارد کنید",
          classes: "w-full",
          isOutString: true
        },
        value: "",
        validation: {
          isMobile: true,
        },
        valid: false,
        errorMsg: "",
        used: false,
      },
    ],
  };

  const initForm2 = {
    formItems: [
      {
        inputType: "simple-input-number",
        config: {
          label: "",
          name: "otp",
          type: "text",
          placeholder: "کد تایید",
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
    ],
  };

  const otpHandler = async (formData: FormData): Promise<void> => {
    try {
      setPhone(formData.phone);
      setLoadingBtn(true);

      const response = await otp(formData.phone);
      const data: OtpResponse = await response.json();
      const status = data.status;
      if (status === "success") {
        setStep(2);
        setToken(data.token || null);
      } else if (status === "error") {
        const msg = data.msg;
        toast.error(msg || "متاسفانه خطایی رخ داده، بعدا مجددا تلاش کنید");
      }
    } catch (err) {
      toast.error("متاسفانه خطایی رخ داده، بعدا مجددا تلاش کنید");
    }
    setLoadingBtn(false);
  };

  const resendOtpHandler = async () => {
    otpHandler({ phone });
  };

  const verifyHandler = async (formData: VerifyFormData): Promise<void> => {
    try {
      setLoadingBtn(true);

      if (!token) {
        throw new Error("خطایی به وجود آمد لطفا بعداد تلاش کنید");
      }

      const response= await verify(token, formData.otp);
      const data: VerifyResponse = await response.json();
      setLoadingBtn(false);
      
      const status = data.status;
      if (status === "success") {
        saveCookie(data.accessToken!, data.refreshToken!);
        setTimeout(() => {
          return router.push("/dashboard");
        }, 100);
      }else{
        toast.error(data.msg || "متاسفانه خطایی رخ داده، بعدا مجددا تلاش کنید");
      }
    } catch (err: any) {
      toast.error("متاسفانه خطایی رخ داده، بعدا مجددا تلاش کنید");
    }
  };

  return (
    <Card title="ورود" classes='w-[90%] max-w-[500px]'>
      {step == 1 ? (
        <Form
          initForm={initForm1}
          submit={otpHandler}
          loading={loadingBtn}
          submitTitle={"ارسال کد تایید"}
          classes={`w-full opacity-100`}
        />
      ) : null}

      {step == 2 ? (
        <>
          <span className="w-full text-[0.9rem] text-textPrimary-100 dark:text-white-100 text-center block ml-1 mb-5 opacity-0 animate-my-fade-left-fast">{`لطفا کد ارسال شده به شماره ${phone} را وارد نمایید`}</span>
          <FormLogin
            initForm={initForm2}
            resendOto={resendOtpHandler}
            submit={verifyHandler}
            loading={loadingBtn}
            submitTitle={"تایید کد"}
            classes={`w-full opacity-0 animate-my-fade-left-fast`}
          />
        </>
      ) : null}
    </Card>
  );
};

export default LoginForm;
