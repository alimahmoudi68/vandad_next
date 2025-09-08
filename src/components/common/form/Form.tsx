"use client";
import { useState, useRef, useEffect } from "react";

import generateVariant from "@/utils/common/generateVariant";
import mapItemsToLabelledValues from "@/utils/common/mapItemsToLabelledValues";
import variantCleaner from "@/utils/common/variantCleaner";

import {
  isHidden,
  inputChange,
  validationByClick,
} from "@/utils/common/formValidation";
import Input from "@/components/common/input/Input";
import Button from "@/components/common/button/Button";
import { singleCategory } from "@/services/adminDashboard/products/categoriesService";

interface FormProps {
  initForm: { formItems: FormItem[] };
  submitTitle: string;
  loading: boolean;
  submit: (form: any) => void;
  classes?: string;
  file?: boolean;
  config?:{
    forComment: boolean;
  }
}

interface FormItem {
  inputType: string;
  value: any;
  value2?: any;
  valid: boolean;
  used: boolean;
  config: {
    options?: { id: string; title: string }[];
    showAttributes?: boolean;
    isDynamic?: boolean;
    isDepend?: boolean;
    isDependField?: string;
    isDependValue?: any[];
    name: string;
    label: string;
    classes?: string;
    justShow?: boolean;
    isAttribute?: boolean;
    isAttributeSelect?: boolean;
    isAttributeVariant?: boolean;
    isSingle?: boolean;
    isOutString?: boolean
  };
  validation: Record<string, any>;
  errorMsg?: string;
  errs?: {
    price: string;
    stock: string;
    sku: string;
  };
}

interface attributeItem {
  title: string;
  slug: string;
  isDynamic: boolean;
  attributeMetas?: {
    _id: string;
    title: string;
    slug: string;
  }[];
}

const Form = ({
  initForm,
  submitTitle,
  loading,
  submit,
  classes,
  file,
  config = { forComment: false }
}: FormProps) => {
  const [form, setForm] = useState(initForm);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setForm(initForm);
  }, [initForm]);

  const inputChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    element: number
  ) => {
    if (form.formItems[element].config.showAttributes) {
      let data;
      if ("data" in e) {
        data = e.data;
      }
      let catId = (data as { id: string })?.id;

      const signleCategoryData = await singleCategory(+catId);
      const attributes = signleCategoryData.category.attributes;

      let newFormItems = form.formItems.filter((item: FormItem) => {
        if (item.config.isAttribute) {
          return false;
        } else {
          return item;
        }
      });

      const newFormItem = attributes.map((item: attributeItem) => {
        if (item.isDynamic) {
          return {
            inputType: "simple-input-with-label",
            config: {
              label: item.title,
              name: item.slug,
              classes: "w-full",
              options: [], // You can add options here if needed
              isAttribute: true,
            },
            value: "",
            validation: {
              required: true,
            },
            valid: true,
            errorMsg: "",
            used: false,
          };
        } else {
          return {
            inputType: "select-multi",
            config: {
              label: item.title,
              name: item.slug,
              classes: "w-full",
              options:
                item.attributeMetas?.map((item) => ({
                  id: item._id,
                  title: item.title,
                })) || [],
              isAttribute: true,
              isAttributeSelect: true,
            },
            value: [],
            validation: {
              required: true,
            },
            valid: true,
            errorMsg: "",
            used: false,
          };
        }
      });

      const updatedFormItems = [...newFormItems, ...newFormItem];
      updatedFormItems.map((item) => {
        if (item.config.showAttributes) {
          return {
            ...item,
            value: catId,
          };
        } else {
          return item;
        }
      });

      setForm(inputChange(e, element, updatedFormItems));
    } else if (form.formItems[element].config.isAttributeSelect) {
      const newForm = inputChange(e, element, form.formItems);

      // remove all attribute variants
      let newFormWithoutAttributeSelect = newForm.formItems.filter(
        (item: FormItem) => {
          if (!item.config.isAttributeVariant) {
            return true;
          } else {
            return false;
          }
        }
      );

      let attributeSelects = newFormWithoutAttributeSelect.filter(
        (item: FormItem) => {
          if (item.config.isAttributeSelect && item.value.length > 1) {
            return true;
          } else {
            return false;
          }
        }
      );

      const attributeSelectsWithDefault = attributeSelects.map((item) => ({
        ...item,
        errorMsg: item.errorMsg ?? "",
      }));
      const attributeSelectsMapped = mapItemsToLabelledValues(
        attributeSelectsWithDefault
      );

      //console.log("attributeSelectsMapped >>>>" , attributeSelectsMapped )

      const merged = Object.assign({}, ...attributeSelectsMapped);
      const newArrObj = [merged];

      let newAttributeVariantArr = generateVariant(newArrObj[0]);

      //console.log("newAttributeVariantArr ?????" , newAttributeVariantArr )

      let newAttributeVariantForm = newAttributeVariantArr.map((i) => {
        return {
          inputType: "attribute-variant",
          config: {
            label: variantCleaner(i).text,
            name: "variants",
            classes: "w-full",
            isAttributeVariant: true,
          },
          value: {
            attributes: variantCleaner(i).cleaned,
            price: "",
          },
          value2: {
            price: "",
            stock: "",
          },
          validation: {
            required: true,
          },
          valid: true,
          errorMsg: "",
          errs: {
            price: "",
            stock: "",
            sku: "",
          },
          used: false,
        };
      });

      //console.log('newArrObj>>' , newArrObj[0])

      //console.log("generateVariant >>> " , generateVariant( newArrObj[0]));

      setForm({
        formItems: [
          ...newFormWithoutAttributeSelect,
          ...newAttributeVariantForm,
        ],
      });
    } else {
      setForm(inputChange(e, element, form.formItems));
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loading) {
      let updatedForm = [...form.formItems];
      setForm(validationByClick(form.formItems));

      let allow = true;
      updatedForm.forEach((item) => {
        if (!item.valid) {
          allow = false;
          return;
        }
      });

      if (allow) {
        try {
          if (file && formRef.current) {
            let formData = new FormData(formRef.current);

            submit(formData);
          } else {
            const newForm: { [key: string]: any } = {};
            let variantArr = [];

            for (let item in form.formItems) {
              if (!form.formItems[item].config.justShow) {
                if (form.formItems[item].inputType === "file") {

                  if(form.formItems[item].config.isSingle){

                    newForm[form.formItems[item].config.name] = form.formItems[
                      item
                    ].value
                      .filter(
                        (file: {
                          errorMsg: string;
                          uploadedId: string;
                          fileUrl: string;
                          id: number;
                        }) => !!file.uploadedId
                      ) // فقط فایل‌هایی که uploadedId دارند
                      .map(
                        (f: {
                          errorMsg: string;
                          uploadedId: string;
                          fileUrl: string;
                          id: number;
                        }) => f.uploadedId
                      )[0]; // فقط uploadedId برمی‌گردونه

                  }else{

                    newForm[form.formItems[item].config.name] = form.formItems[
                      item
                    ].value
                      .filter(
                        (file: {
                          errorMsg: string;
                          uploadedId: string;
                          fileUrl: string;
                          id: number;
                        }) => !!file.uploadedId
                      ) // فقط فایل‌هایی که uploadedId دارند
                      .map(
                        (f: {
                          errorMsg: string;
                          uploadedId: string;
                          fileUrl: string;
                          id: number;
                        }) => f.uploadedId
                      ); // فقط uploadedId برمی‌گردونه
                  }

                }else if(form.formItems[item].inputType === "simple-input-number" || form.formItems[item].inputType === "simple-input-number-with-label"){
                  if(form.formItems[item].config?.isOutString){
                    newForm[form.formItems[item].config.name] = form.formItems[item].value;
                  }else{
                    newForm[form.formItems[item].config.name] = Number(form.formItems[item].value);
                  }
                }else if(form.formItems[item].inputType === "faqs"){
                  newForm[form.formItems[item].config.name] = form.formItems[
                    item
                  ].value
                    .map(
                      (f: {
                        question: string;
                        answer: string;
                      }) => ({
                        question: f.question ,
                        answer: f.answer
                      })
                    );
                
                } else if (
                  form.formItems[item].inputType === "attribute-variant"
                ) {
                  variantArr.push(form.formItems[item].value);
                } else {
                  newForm[form.formItems[item].config.name] =
                    form.formItems[item].value;
                }

                if (variantArr.length > 0) {
                  newForm["variants"] = variantArr;
                }
              }
            }

            submit(newForm);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      ref={formRef}
      className={`${classes} w-full flex items-center gap-y-6 flex-wrap`}
    >
      {form.formItems?.map((input: FormItem, index: number) => {
        return (
          <Input
            key={index}
            inputElement={input.inputType}
            hidden={isHidden(form.formItems, index)}
            config={input.config}
            value={input.value}
            value2={input.value2}
            valid={input.valid}
            validation={input.validation}
            errorMsg={input.errorMsg}
            errs={input.errs}
            used={input.used}
            change={(e: React.ChangeEvent<HTMLInputElement>) =>
              inputChangeHandler(e, index)
            }
          />
        );
      })}

      <div className={`w-full flex flex-wrap flex-col ${config.forComment ? 'items-end' : 'items-center mt-10'}`}>
        <Button loading={loading} type="submit" classes="min-w-[150px]">
          {submitTitle}
        </Button>
      </div>
    </form>
  );
};

export default Form;
