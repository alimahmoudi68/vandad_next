"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { editProduct } from "@/services/adminDashboard/products/productsService";
import Form from "@/components/common/form/Form";
import { handleServerError } from "@/utils/common/handleServerError";
import { INewProduct } from "@/types/products";
import { IProductCat } from "@/types/products/index";
import { IProduct } from "@/types/products/index";
import filterSingleAttributes from "@/utils/common/removeVariantsAttributes";
import extractAttrFromAttributes from "@/utils/common/extractAttrFromAttributes";
import extractAttrFromVariants from "@/utils/common/extractAttrFromVariants";
import { IUpload } from "@/types/upload";
import { IAttributeMeta, IProductAttr } from "@/types/products";


interface EditProductPageProps {
  id: string
  categories: IProductCat[]
  product: IProduct
}

interface FormItem {
  inputType: string;
  config: {
    name: string;
    label: string;
    classes?: string;
    [key: string]: any;
    removeFromServer?: boolean;
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

export default function EditProductPage({id,categories,product}: EditProductPageProps) {

  console.log('product' , product)
  //console.log('categories' , categories)

  const router = useRouter();

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
        value: product.title,
        validation: {
          required: true,
          maxLength: 50,
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
        value: product.slug,
        validation: {
          required: true,
          maxLength: 50,
        },
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "simple-input-price-with-label",
        config: {
          isOutString: false , 
          label: "قیمت فروش",
          name: "price",
          type: "text",
          placeholder: "",
          isDepend: true,
          isDependField: "variants",
          isDependValue: [],
          classes: "w-full",
          area: 'main',
          sectionId: 'basic', 
          sectionTitle: 'اطلاعات پایه', 
          order: 1, 
        },
        value: product.price ? product.price : "",
        value2: product.price ? product.price.toLocaleString() : "",
        validation: {
          required: true,
        },
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "simple-input-price-with-label",
        config: {
          isOutString: false , 
          label: "قیمت با تخفیف",
          name: "discountPrice",
          classes: "w-full",
          isDepend: true,
          isDependField: "variants",
          isDependValue: [],
          area: 'main',
          sectionId: 'basic', 
          sectionTitle: 'اطلاعات پایه', 
          order: 1,
        },
        value: product.discountPrice,
        value2: product.discountPrice,
        validation: {},
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "select-with-label",
        config: {
          label: "دسته بندی",
          name: "categories",
          classes: "w-full",
          area: "sidebar",
          cardId: "catsBox",
          cardTitle: "دسته‌بندی‌ها",
          order: 1,
          options: categories?.map((item: IProductCat) => ({
            id: item.id,
            title: item.title,
          })) || [],
          showAttributes: true,
        },
        value: product.categories?.[0]?.id ? [product.categories[0].id] : [],
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
          label: "توضیحات",
          name: "description",
          classes: "w-full",
          area: 'main',
          sectionId: 'basic', 
          sectionTitle: 'اطلاعات پایه', 
          order: 1, 
        },
        value: product.description,
        validation: {
          required: true,
          maxLength: 2000,
        },
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "simple-input-with-label",
        config: {
          label: "شناسه کالا",
          name: "sku",
          classes: "w-full",
          isDepend: true,
          isDependField: "variants",
          isDependValue: [],
          area: 'main',
          sectionId: 'basic', 
          sectionTitle: 'اطلاعات پایه', 
          order: 1, 
        },
        value: product.sku,
        validation: {},
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "simple-input-number-with-label",
        config: {
          isOutString: false , 
          label: "موجودی",
          name: "stock",
          classes: "w-full",
          isDepend: true,
          isDependField: "variants",
          isDependValue: [],
          area: 'main',
          sectionId: 'basic', 
          sectionTitle: 'اطلاعات پایه', 
          order: 1, 
        },
        value: (product.stock).toLocaleString(),
        value2: product.stock,
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
          name: "thumbnail",
          classes: "w-full",
          removeFromServer: true,
          isSingle: true,
          area: 'main',
          sectionId: 'thumbnailBox', 
          sectionTitle: '', 
          order: 5, 
        },
        value: [
          {
            id: 0,
            uploadedId: product.thumbnail ? product.thumbnail.id : null,
            errorMsg: "",
            fileUrl: product.thumbnail
              ? {
                  bucketName: product.thumbnail.bucket,
                  fileName: product.thumbnail.location,
                }
              : null,
          },
        ],
        validation: {},
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "file",
        config: {
          label: "گالری عکس",
          name: "images",
          classes: "w-full",
          removeFromServer: true,
          area: 'main',
          sectionId: 'galleryBox', 
          sectionTitle: '', 
          order:5,
        },
        // value: [{
        //   id: 0,
        //   uploadedId: null,
        //   errorMsg: "",
        //   fileUrl: null,
        // }],
        value: (Array.isArray(product.images) && product.images.length > 0)
          ? product.images.map((item: IUpload) => ({
              id: item.id ?? 0,
              uploadedId: item.id ?? null,
              errorMsg: "",
              fileUrl: { bucketName: item.bucket, fileName: item.location },
            }))
          : [
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
    ],
  });


  useEffect(() => {

      const newFormItemAttr = (
        product.categories?.[0]?.attributes as unknown as IAttributeMeta[] | undefined
      )?.map((item: IAttributeMeta) => {
        if(item.isDynamic){
            return{
                inputType: "simple-input-with-label",
                config: {
                    label: item.title,
                    name: item.slug,
                    classes: "w-full",
                    options: [], // You can add options here if needed
                    isAttribute: true,
                    area: 'sidebar',
                    cardId: 'attrBox',
                    cardTitle: 'ویژگی‌ها',
                    order: 2,
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: true,
                errorMsg: "",
                used: false
            }
        }else{
            return{
                inputType: "select-multi",
                config: {
                    label: item.title,
                    name: item.slug,
                    classes: "w-full",
                    options: item.metas?.map((meta: { id: number; title: string; slug: string }) => ({
                        id: meta.id,
                        title: meta.title
                    })) || [], 
                    isAttribute: true,
                    area: 'sidebar',
                    cardId: 'attrBox',
                    cardTitle: 'ویژگی‌ها',
                    order: 2,
                },
                value: [...extractAttrFromAttributes(product, item.slug) , ...extractAttrFromVariants(product, item.slug)],
                validation: {
                    required: true,
                },
                valid: true,
                errorMsg: "",
                used: false
                
            }
        }
      }) ?? [];


      setForm((prev) => ({ formItems: [...prev.formItems, ...newFormItemAttr ] }));

    // // const newFormItemVar = product.variants.map((variant : IVariantItem)=>{
  
    // //   return{
    // //     inputType: "attribute-variant",
    // //     config: {
    // //         label: extractAttributeMetaTitles(variant).label,
    // //         name: "variants",
    // //         classes: "w-full",
    // //         isAttributeVariant : true,
    // //     },
    // //     value: {
    // //         attributes : extractAttributeMetaTitles(variant).attributes,
    // //         price : variant.price ,
    // //         sku: variant.sku,
    // //         stock: variant.stock,
    // //     },
    // //     value2:{
    // //         price : Number(variant.price).toLocaleString() ,
    // //         stock: Number(variant.stock).toLocaleString()
    // //     },
    // //     validation: {
    // //         required: true,
    // //     },
    // //     valid: true,
    // //     errorMsg: "",
    // //     errs: {
    // //         price:"" ,
    // //         stock: "" ,
    // //         sku: ""
    // //     },
    // //     used: false
    // //   }
    // // })
  
    //   //setFormInput({ formItems: [...initFormInput.formItems, ...newFormItemAttr , ...newFormItemVar] });
  
    // } , []);

  }, []);



  const submitHandler = async (form: INewProduct) => {
    setLoadingBtn(true);

    try {

      const {
        title,
        description,
        price,
        discountPrice,
        thumbnail,
        images,
        stock,
        sku,
        categories,
        variants ,
        ...rest
      } = form;

       const payload = {
        title,
        description,
        price,
        discountPrice,
        thumbnail,
        images,
        stock,
        sku,
        categories,
        attributes: filterSingleAttributes({ attributes: rest }).attributes,
        variants ,
      };

      //console.log(payload);

      const data = await editProduct(id, payload);

      if (data.status === "success") {
        toast.success("محصول با موفقیت ویرایش شد");
        router.push("/admin-dashboard/products");
      } else {
        handleServerError({
          ...data,
          msg: data.msg ?? "خطایی رخ داده است.",
        });
      }
    } catch (err) {
      console.log(err);
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
        ویرایش محصول
      </h1>
     
      <Form
        initForm={form}
        submit={submitHandler}
        loading={loadingBtn}
        submitTitle="ویرایش" 
        config={{ forComment: false, layout: "wp", activeTabId: "general" }}
      />
          
    </div>
  );
}
