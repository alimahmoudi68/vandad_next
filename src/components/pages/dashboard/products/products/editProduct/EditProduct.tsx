"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import Card from "@/components/common/card/Card";
import { editProduct } from "@/services/dashboard/products/productsService";
import Form from "@/components/common/form/Form";
import { handleServerError } from "@/utils/common/handleServerError";
import { INewProduct } from "@/types/dashboard/products";
import filterSingleAttributes from "@/utils/common/removeVariantsAttributes";
import extractAttributeMetaTitles from "@/utils/common/extractAttributeMetaTitles";
import { IVariantItem } from "@/types/dashboard/products/editProduct";
import { ICattegoryAttributeItem } from "@/types/dashboard/products/editProduct";
import getAttributesById from "@/utils/common/getAttributesById";

interface IProduct {
  _id: string;
  title: string;
  slug: string;
  price: number;
  discount: boolean;
  discountPrice: number;
  [key: string]: any;
}

interface ICategory {
  _id: string;
  title: string;
  slug: string;
  [key: string]: any;
}

interface EditProductPageProps {
  permissions: string[];
  categories: ICategory[];
  product: IProduct;
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

export default function EditProductPage({
  permissions,
  categories,
  product,
}: EditProductPageProps) {
  console.log("product", product);

  const router = useRouter();

  const [loadingBtn, setLoadingBtn] = useState(false);
  const [FormInput, setFormInput] = useState<IForm>({ formItems: [] });

  const initFormInput: IForm = {
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
        inputType: "simple-input-price-with-label",
        config: {
          label: "قیمت فروش",
          name: "price",
          type: "text",
          placeholder: "",
          classes: "w-full",
          isDepend: true,
          isDependField: "isVariant",
          isDependValue: [false],
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
        inputType: "checkbox",
        config: {
          label: "تخفیف",
          name: "discount",
          classes: "w-full",
        },
        value: product.discount,
        validation: {},
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "simple-input-price-with-label",
        config: {
          label: "قیمت با تخفیف",
          name: "discountPrice",
          classes: "w-full",
          isDepend: true,
          isDependField: "discount",
          isDependValue: [true],
        },
        value: product.discountPrice,
        value2: product.discountPrice,
        validation: {},
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
          label: "موجودی",
          name: "stock",
          classes: "w-full",
        },
        value: product.stock,
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
          removeFromServer: false,
          isSingle: true,
        },
        value: [
          {
            id: 0,
            uploadedId: product.thumbnail ? product.thumbnail._id : null,
            errorMsg: "",
            fileUrl: product.thumbnail
              ? {
                  bucketName: product.thumbnail.bucket,
                  fileName: product.thumbnail.original,
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
          removeFromServer: false,
        },
        // value: [{
        //   id: 0,
        //   uploadedId: null,
        //   errorMsg: "",
        //   fileUrl: null,
        // }],
        value: product.images
          ? product.images.map(
              (item: {
                _id: string;
                bucket: string;
                original: string;
                thumb: string;
              }) => ({
                id: item._id,
                uploadedId: item._id,
                errorMsg: "",
                fileUrl: { bucketName: item.bucket, fileName: item.original },
              })
            )
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
      {
        inputType: "select-with-label",
        config: {
          label: "دسته بندی",
          name: "categories",
          classes: "w-full",
          options: categories.map((item: ICategory) => ({
            id: item._id,
            title: item.title,
          })),
          showAttributes: true,
        },
        value: [product.categories[0]._id],
        validation: {
          required: true,
        },
        valid: false,
        errorMsg: "",
        used: false,
      },
      {
        inputType: "checkbox",
        config: {
          label: "محصول متغیر",
          name: "isVariant",
          classes: "w-full",
        },
        value: product.isVariant,
        validation: {},
        valid: false,
        errorMsg: "",
        used: false,
      },
    ],
  };

  useEffect(() => {
    const newFormItemAttr = product.categories[0].attributes.map(
      (item: ICattegoryAttributeItem) => {
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
            value: getAttributesById(item._id, product.attributes, []),
            validation: {
              required: true,
            },
            valid: true,
            errorMsg: "",
            used: false,
          };
        } else {
          console.log("item.title", item.title);
          console.log(
            ">>>",
            getAttributesById(item._id, product.attributes, product.variants)
          );
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
            },
            value: getAttributesById(
              item._id,
              product.attributes,
              product.variants
            ),
            validation: {
              required: true,
            },
            valid: true,
            errorMsg: "",
            used: false,
          };
        }
      }
    );

    const newFormItemVar = product.variants.map((variant: IVariantItem) => {
      return {
        inputType: "attribute-variant",
        config: {
          label: extractAttributeMetaTitles(variant).label,
          name: "variants",
          classes: "w-full",
          isAttributeVariant: true,
        },
        value: {
          attributes: extractAttributeMetaTitles(variant).attributes,
          price: variant.price,
          sku: variant.sku,
          stock: variant.stock,
        },
        value2: {
          price: Number(variant.price).toLocaleString(),
          stock: Number(variant.stock).toLocaleString(),
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

    setFormInput({
      formItems: [
        ...initFormInput.formItems,
        ...newFormItemAttr,
        ...newFormItemVar,
      ],
    });
  }, []);

  const submitHandler = async (form: INewProduct) => {
    setLoadingBtn(true);

    try {
      const {
        title,
        slug,
        description,
        isVariant,
        price,
        discount,
        discountPrice,
        thumbnail,
        images,
        stock,
        sku,
        categories,
        variants,
        ...rest
      } = form;

      const payload = {
        title,
        slug,
        description,
        isVariant,
        price,
        discount,
        discountPrice,
        thumbnail: thumbnail[0],
        images,
        stock,
        sku,
        categories,
        variants,
        attributes: filterSingleAttributes({ attributes: rest }).attributes,
      };

      console.log(payload);

      const data = await editProduct(product._id, payload);

      if (data.status === "success") {
        toast.success("ویژگی جدید با موفقیت ثبت شد");
        router.push("/dashboard/products");
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
      <Card title="" classes="w-[90%] max-w-[600px] mx-auto">
        <Form
          initForm={FormInput}
          submit={submitHandler}
          loading={loadingBtn}
          submitTitle="ثبت"
        />
      </Card>
    </div>
  );
}
