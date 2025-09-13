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
import { IFormItems } from '@/types/form';

interface FormProps {
  initForm: { formItems: IFormItems[] };
  submitTitle: string;
  loading: boolean;
  submit: (form: any) => void;
  classes?: string;
  file?: boolean;
  config?:{
    forComment: boolean;
    layout?: "default" | "wp";
    activeTabId?: string;
  }
}

interface attributeItem {
  title: string;
  slug: string;
  isDynamic: boolean;
  metas?: {
    id: string;
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
  const [activeTab, setActiveTab] = useState<string | null>(null);

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
      console.log('signleCategoryData' , signleCategoryData)
      const attributes = signleCategoryData.category.attributes;

      let newFormItems = form.formItems.filter((item: IFormItems) => {
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
              area: "sidebar",
              cardId: "attrBox",
              cardTitle: "ویژگی‌ها",
              order:2,
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
                item.metas?.map((item) => ({
                  id: item.id,
                  title: item.title,
                })) || [],
              isAttribute: true,
              isAttributeSelect: true,
              area: "sidebar",
              cardId: "attrBox",
              cardTitle: "ویژگی‌ها",
              order:2
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
        (item: IFormItems) => {
          if (!item.config.isAttributeVariant) {
            return true;
          } else {
            return false;
          }
        }
      );

      let attributeSelects = newFormWithoutAttributeSelect.filter(
        (item: IFormItems) => {
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
            area: "sidebar" as const,
            sectionId: 'variantBox', 
            sectionTitle: 'متغیرهای محصول', 
            order:2,
          },
          value: {
            attributes: variantCleaner(i).cleaned,
            price: "",
            discountPrice:"",
            stock: "",
            sku: "",
            images : [
              {
                id: 0,
                file:null ,
                uploadedId: null,
                errorMsg: "",
                fileUrl: null,
              }
            ]
          },
          value2: {
            price: "",
            stock: "",
            sku: "",
            discountPrice:"",
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
            discountPrice:""
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

                    console.log('43')

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
                  
                  let variantValue = form.formItems[item].value;
                  variantValue.images.filter(
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
                  );
                  variantArr.push(variantValue);

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

  const layoutMode = config?.layout ?? "default";

  // helpers for layout grouping
  const byOrder = (a: IFormItems, b: IFormItems) => (a.config.order ?? 0) - (b.config.order ?? 0);

  if (layoutMode === "wp") {
    const items = form.formItems ?? [];
    const main = items.filter(i => (i.config.area ?? "main") === "main");
    const sidebar = items.filter(i => i.config.area === "sidebar");

    const tabsMap: Record<string, { id: string; title: string; sections: Record<string, { id: string; title?: string; fields: IFormItems[] }> }> = {};
    main.forEach((f) => {
      const tId = f.config.tabId ?? "general";
      const tTitle = f.config.tabTitle ?? "General";
      if (!tabsMap[tId]) tabsMap[tId] = { id: tId, title: tTitle, sections: {} };
      const sId = f.config.sectionId ?? "default";
      const sTitle = f.config.sectionTitle;
      if (!tabsMap[tId].sections[sId]) tabsMap[tId].sections[sId] = { id: sId, title: sTitle, fields: [] };
      tabsMap[tId].sections[sId].fields.push(f);
    });

    const tabs = Object.values(tabsMap);
    const computedDefaultTab = config?.activeTabId ?? (tabs[0]?.id || "general");
    const activeTabId = activeTab ?? computedDefaultTab;
    useEffect(() => {
      if (!activeTab && computedDefaultTab) {
        setActiveTab(computedDefaultTab);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [computedDefaultTab]);
    const singleTabMode = tabs.length <= 1;

    const sidebarCardsMap: Record<string, { id: string; title?: string; collapsible?: boolean; defaultOpen?: boolean; fields: IFormItems[]; order?: number }> = {};
    sidebar.forEach((f) => {
      const cId = f.config.cardId ?? f.config.name ?? "card";
      if (!sidebarCardsMap[cId]) sidebarCardsMap[cId] = { id: cId, title: f.config.cardTitle, collapsible: f.config.collapsible, defaultOpen: f.config.defaultOpen, fields: [], order: f.config.order };
      sidebarCardsMap[cId].title = sidebarCardsMap[cId].title ?? f.config.cardTitle;
      sidebarCardsMap[cId].fields.push(f);
    });
    const sidebarCards = Object.values(sidebarCardsMap).sort((a,b)=>(a.order ?? 0)-(b.order ?? 0));

    return (
      <form
        onSubmit={submitHandler}
        ref={formRef}
        className={`${classes} w-full`}
      >
        <div className="w-full grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-9 space-y-6">
            <div className="w-full">
              {!singleTabMode && (
                <div className="flex gap-2 border-b mb-4 overflow-x-auto">
                  {tabs.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActiveTab(t.id)}
                      className={`px-3 py-2 ${t.id === activeTabId ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
                    >
                      {t.title}
                    </button>
                  ))}
                </div>
              )}
              {(singleTabMode ? tabs : tabs.filter(t => t.id === activeTabId)).map((t) => (
                <div key={t.id} className={`space-y-6`}>
                  {Object.values(t.sections).map((s) => (
                    <div key={s.id} className="w-full border rounded-md p-4 bg-white">
                      {s.title ? <div className="font-medium mb-4">{s.title}</div> : null}
                      <div className="grid grid-cols-12 gap-4">
                        {s.fields.sort(byOrder).map((input: IFormItems, index: number) => {
                          const isFieldHidden = isHidden(form.formItems, form.formItems.indexOf(input));
                          if (isFieldHidden) return null;
                          
                          return (
                            <div key={`${input.config.name}-${index}`} className={`col-span-12 ${input.config.colSpan ? `lg:col-span-${input.config.colSpan}` : ''}`}>
                              <Input
                                inputElement={input.inputType}
                                hidden={false}
                                config={input.config}
                                value={input.value}
                                value2={input.value2}
                                valid={input.valid}
                                validation={input.validation}
                                errorMsg={input.errorMsg}
                                errs={input.errs}
                                used={input.used}
                                change={(e: React.ChangeEvent<HTMLInputElement>) =>
                                  inputChangeHandler(e, form.formItems.indexOf(input))
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            {/* دکمه سابمیت زیر محتوای main - فقط در دسکتاپ */}
            <div className={`hidden lg:flex w-full flex-wrap flex-col ${config.forComment ? 'items-end' : 'items-center mt-10'}`}>
              <Button loading={loading} type="submit" classes="min-w-[150px]">
                {submitTitle}
              </Button>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-3 space-y-4">
            {sidebarCards.map((card) => (
              <div key={card.id} className="border rounded-md p-4 bg-white">
                {card.title ? <div className="font-medium mb-4">{card.title}</div> : null}
                <div className="space-y-4">
                  {card.fields.sort(byOrder).map((input: IFormItems, index: number) => {
                    const isFieldHidden = isHidden(form.formItems, form.formItems.indexOf(input));
                    if (isFieldHidden) return null;
                    
                    return (
                      <Input
                        key={`${input.config.name}-${index}`}
                        inputElement={input.inputType}
                        hidden={false}
                        config={input.config}
                        value={input.value}
                        value2={input.value2}
                        valid={input.valid}
                        validation={input.validation}
                        errorMsg={input.errorMsg}
                        errs={input.errs}
                        used={input.used}
                        change={(e: React.ChangeEvent<HTMLInputElement>) =>
                          inputChangeHandler(e, form.formItems.indexOf(input))
                        }
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* دکمه سابمیت زیر همه چیز - فقط در موبایل */}
        <div className={`lg:hidden w-full flex flex-wrap flex-col ${config.forComment ? 'items-end' : 'items-center mt-10'}`}>
          <Button loading={loading} type="submit" classes="min-w-[150px]">
            {submitTitle}
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form
      onSubmit={submitHandler}
      ref={formRef}
      className={`${classes} w-full flex items-center gap-y-6 flex-wrap`}
    >
      {form.formItems?.map((input: IFormItems, index: number) => {
        const isFieldHidden = isHidden(form.formItems, index);
        if (isFieldHidden) return null;
        
        return (
          <Input
            key={index}
            inputElement={input.inputType}
            hidden={false}
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
