"use client";
import { useState } from 'react';
import { inputChange, validationByClick } from '@/utils/common/formValidation';
import Input from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';
import Timer from "@/components/common/Timer/Timer";


interface FormLoginProps {
  initForm: any;
  submitTitle: string;
  loading: boolean;
  submit: (form: any) => void;
  classes: string;
  resendOto: () => void;
}


interface FormItem {
  inputType: string;
  config: {
    name: string;
    isdepend?: boolean;
    isdependfield?: string;
    isdependvalue?: string;
    justShow?: boolean;
  };
  value: string;
  value2: string;
  valid: boolean;
  errorMsg: string;
  used: boolean;
}

const FormLogin = ({initForm, submitTitle, loading, submit, classes, resendOto}: FormLoginProps) => {

    const [showResendCode, setShowResendCode] = useState(false);
    const [form, setForm] = useState(initForm);

    const resendOtpHandler = ()=>{
      setShowResendCode(false);
      resendOto();
    }

    const TimerElement = () => {
      if (showResendCode) {
        return (
          <p className="text-sm my-2 text-primary-100 font-normal hover:cursor-pointer" onClick={resendOtpHandler}>ارسال مجدد کد تایید</p>
        );
      } else {
        return <Timer finish={finishTimer} />;
      }
    };


    const finishTimer = () => {
      setShowResendCode(true);
    };
  

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, element: number) => {
      setForm(inputChange(e, element, form.formItems));
    }
        

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!loading) {
        let updatedForm = [...form.formItems];
        setForm(validationByClick(form.formItems));

        let allow = true;
        updatedForm.forEach(item => {
          if (!item.valid) {
            allow = false;
            return;
          }
        });

        if (allow) {
          try {
            const newForm: { [key: string]: string } = {};
            for (let item in form.formItems) {
              if (!form.formItems[item].config.justShow) {
                newForm[form.formItems[item].config.name] = form.formItems[item].value;
              }
            }
            submit(newForm);
          } catch (err) {
            console.log(err);
          }
        }
      }
    };

    return(
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitHandler(e)} className={`${classes} w-full flex items-center flex-wrap`}>
          {
            form.formItems?.map((input: FormItem, index: number) => {

          if(input.config?.isdepend){

            let dependFieldindex: number = form?.formItems.findIndex((item: FormItem) => item.config.name == input.config.isdependfield);
            let dependFieldValue: string | undefined = input.config.isdependvalue; 

            if(form?.formItems[dependFieldindex].value == dependFieldValue){
              return(
                <Input
                key={index}
                inputElement={input.inputType}
                config={input.config}
                value={input.value}
                valid={input.valid}
                errorMsg={input.errorMsg}
                used={input.used}
                change={(e: React.ChangeEvent<HTMLInputElement>) => inputChangeHandler(e, index)}
                />
              )
            }

          } else {

            return(
              <Input
              key={index}
              inputElement={input.inputType}
              config={input.config}
              value={input.value}
              valid={input.valid}
              errorMsg={input.errorMsg}
              used={input.used}
              change={(e: React.ChangeEvent<HTMLInputElement>) => inputChangeHandler(e, index)}
              />
            )
          }
              }) 
            }

            <div className="w-full mt-2 h-6 flex justify-center items-center text-textPrimary-100 dark:text-white-100">{TimerElement()}</div>

            <div className="w-full flex flex-wrap flex-col items-center mt-5">
              <Button
              loading={loading} 
              type="submit">
                {submitTitle}
              </Button>
            </div>
        </form>
    )
}

export default FormLogin;